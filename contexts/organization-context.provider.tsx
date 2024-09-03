import { OrganizationForm } from "@/components/organization/CreateOrganizationForm";
import { IMembers } from "@/shared-libs/firestore/crowdy-chat/models/members";
import { IOrganizations } from "@/shared-libs/firestore/crowdy-chat/models/organizations";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { useRouter } from "expo-router";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useFirebaseStorageContext } from "./firebase-storage-context.provider";
import { Organization } from "@/types/Organization";
import { useAuthContext } from "./auth-context.provider";
import { useStorageState } from "@/hooks";

interface OrganizationContextProps {
  changeOrganization: (org: Organization) => Promise<void>;
  createOrganization: (data: OrganizationForm) => Promise<void>;
  currentOrganization: Organization | undefined;
  getOrganizations: () => Promise<Organization[] | undefined>;
  isOrganizationsLoading: boolean;
  organizations: Organization[];
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  setOrgId: (value: string | null) => void;
  updateOrganization: (
    orgId: string,
    updatedData: Partial<Organization>
  ) => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextProps>(null!);

export const useOrganizationContext = () => useContext(OrganizationContext);

export const OrganizationContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [[, orgId], setOrgId] = useStorageState("current-org-id");
  const [currentOrganization, setCurrentOrganization] =
    useState<Organization>();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isOrganizationsLoading, setIsOrganizationsLoading] =
    useState<boolean>(true);

  const router = useRouter();
  const { uploadImage } = useFirebaseStorageContext();
  const { session } = useAuthContext();

  const fetchOrganization = async () => {
    const result = await getOrganizations();

    if (!result) {
      router.push("/(organization)/create-new-organization");
    } else {
      router.push("/(main)/(campaigns)/campaigns");
    }
  };

  const changeOrganization = async (org: Organization) => {
    setCurrentOrganization(org);
    setOrgId(org.id);
  }

  useEffect(() => {
    if (session) {
      fetchOrganization();
    }
  }, [session]);

  const createOrganization = async (data: OrganizationForm) => {
    if (!session) {
      return;
    }
    if (data.image) {
      data.image = await uploadImage(
        data.image,
        `organizations/${session}/${data.name}`
      );
    }

    const colRef = collection(FirestoreDB, "organizations");

    let orgData: IOrganizations = {
      name: data.name,
      createdAt: Date.now(),
      createdBy: session,
      description: data.description,
      industry: data.industry,
      website: data.website,
      image: data.image,
    };
    let orgDoc = await addDoc(colRef, orgData);

    let memberColRef = collection(
      FirestoreDB,
      "organizations",
      orgDoc.id,
      "members"
    );
    let memberData: IMembers = {
      userId: session,
      username: "",
      organizationId: orgDoc.id,
      permissions: {
        admin: true,
      },
    };

    // Keep member ID same as user ID
    let memberDocRef = doc(memberColRef, session);
    await setDoc(memberDocRef, memberData);

    if (!orgDoc.id) {
      Toaster.error("Organization creation failed");
    } else {
      const createdOrg = await getOrganizationById(orgDoc.id);
      if (createdOrg) {
        await getOrganizations();
        changeOrganization(createdOrg);
      }
      Toaster.success("Organization created successfully");
      router.push("/(main)/organization-profile");
    }
  };

  const getOrganizationById = async (
    organizationId: string
  ): Promise<Organization | null> => {
    const orgRef = doc(FirestoreDB, "organizations", organizationId);
    const orgDoc = await getDoc(orgRef);

    if (orgDoc.exists()) {
      return {
        id: orgDoc.id,
        ...orgDoc.data(),
      } as Organization;
    } else {
      return null;
    }
  };

  const getOrganizations = async (): Promise<Organization[] | undefined> => {
    setIsOrganizationsLoading(true);
    try {
      const membersColGroupRef = collectionGroup(FirestoreDB, "members");
      const orgsQuery = query(
        membersColGroupRef,
        where("userId", "==", session)
      );
      const orgsSnapshot = await getDocs(orgsQuery);

      // If no organizations found, redirect to create new organization page
      if (orgsSnapshot.empty) {
        return undefined;
      }

      const orgDataPromises = orgsSnapshot.docs.map(async (docSnapshot) => {
        const { organizationId } = docSnapshot.data();
        const orgRef = doc(FirestoreDB, "organizations", organizationId);
        const orgDoc = await getDoc(orgRef);

        if (orgDoc.exists()) {
          return {
            id: orgDoc.id,
            ...orgDoc.data(),
          } as Organization;
        } else {
          return null;
        }
      });

      const orgDataArray = await Promise.all(orgDataPromises);

      const data = orgDataArray.filter((orgData) => orgData !== null);

      if (data.length === 0) {
        Toaster.error("No organizations found");
        return undefined;
      }

      if (orgId) { // If orgId is present in storage, set the current organization to that
        setCurrentOrganization(data.find((org) => org?.id === orgId) || data[0] as Organization);
      } else if (currentOrganization) { // If current organization is set, update it with the latest data
        setCurrentOrganization(data.find((org) => org?.id === currentOrganization?.id) || currentOrganization);
      } else { // By default, set the first organization as current organization
        changeOrganization(data[0] as Organization);
      }

      setOrganizations(data as Organization[]);
      return data as Organization[];
    } catch (error) {
      console.error("Error getting organizations: ", error);
      Toaster.error("Failed to get organizations");
    } finally {
      setIsOrganizationsLoading(false);
    }
  };


  const updateOrganization = async (orgId: string, data: Partial<OrganizationForm>) => {

    if (data.image) {
      data.image = await uploadImage(data.image, `organizations/${session}/${data.name}`);
    }

    const orgDocRef = doc(FirestoreDB, "organizations", orgId);

    try {
      await updateDoc(orgDocRef, data);
      getOrganizations();
      Toaster.success("Organization updated successfully");
    } catch (error) {
      console.error("Error updating organization: ", error);
      Toaster.error("Organization update failed");
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        changeOrganization,
        createOrganization,
        currentOrganization,
        getOrganizations,
        isOrganizationsLoading,
        organizations,
        setOrganizations,
        setOrgId,
        updateOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
