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

interface OrganizationContextProps {
  createOrganization: (data: OrganizationForm) => Promise<void>;
  currentOrganization: Organization | undefined;
  getOrganizations: () => Promise<Organization[] | undefined>;
  isOrganizationsLoading: boolean;
  organizations: Organization[];
  setCurrentOrganization: React.Dispatch<React.SetStateAction<Organization | undefined>>;
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  updateOrganization: (orgId: string, updatedData: Partial<Organization>) => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextProps>(null!);

export const useOrganizationContext = () => useContext(OrganizationContext);

export const OrganizationContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentOrganization, setCurrentOrganization] = useState<Organization>();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isOrganizationsLoading, setIsOrganizationsLoading] = useState<boolean>(true);

  const router = useRouter();
  const {
    uploadImage,
  } = useFirebaseStorageContext();
  const {
    session,
  } = useAuthContext();

  const fetchOrganization = async () => {
    const result = await getOrganizations();

    if (!result) {
      router.push("/(organization)/create-new-organization");
    } else {
      router.push("/(main)/(campaigns)/campaigns");
    }
  };

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
      data.image = await uploadImage(data.image, `organizations/${session}/${data.name}`);
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

    let memberColRef = collection(FirestoreDB, "organizations", orgDoc.id, "members");
    let memberData: IMembers = {
      userId: session,
      organizationId: orgDoc.id,
      permissions: {
        admin: true
      }
    }

    // Keep member ID same as user ID
    let memberDocRef = doc(memberColRef, session)
    await setDoc(memberDocRef, memberData)

    if (!orgDoc.id) {
      Toaster.error("Organization creation failed");
    } else {
      await getOrganizations();
      Toaster.success("Organization created successfully");
      router.push("/(main)/organization-profile");
    }
  };

  const getOrganizations = async (): Promise<Organization[] | undefined> => {
    setIsOrganizationsLoading(true);
    try {
      const membersColGroupRef = collectionGroup(FirestoreDB, "members");
      const orgsQuery = query(membersColGroupRef, where("userId", "==", session));
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

      setCurrentOrganization(data[0] as Organization);
      setOrganizations(data as Organization[]);
      return data;
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
      router.push("/(main)/organization-profile");
    } catch (error) {
      console.error("Error updating organization: ", error);
      Toaster.error("Organization update failed");
    }
  }

  return (
    <OrganizationContext.Provider
      value={{
        createOrganization,
        currentOrganization,
        getOrganizations,
        isOrganizationsLoading,
        organizations,
        setCurrentOrganization,
        setOrganizations,
        updateOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
