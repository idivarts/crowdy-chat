import { OrganizationForm } from "@/components/organization/CreateOrganizationForm";
import { IMembers } from "@/shared-libs/firestore/crowdy-chat/models/members";
import { IOrganizations } from "@/shared-libs/firestore/crowdy-chat/models/organizations";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { router } from "expo-router";
import { signInAnonymously } from "firebase/auth";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
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
} from "react";
import { useFirebaseStorageContext } from "./firebase-storage-context.provider";
import { Organization } from "@/types/Organization";

interface OrganizationContextProps {
  createOrganization: (data: OrganizationForm) => Promise<void>;
  currentOrganization: Organization | undefined;
  getOrganizations: () => Promise<void>;
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

  const {
    uploadImage,
  } = useFirebaseStorageContext();

  const createOrganization = async (data: OrganizationForm) => {
    let authUser = await signInAnonymously(AuthApp); // TODO: Remove after implementing proper auth

    if (data.image) {
      data.image = await uploadImage(data.image, `organizations/${authUser.user.uid}/${data.name}`);
    }

    const colRef = collection(FirestoreDB, "organizations");

    let orgData: IOrganizations = {
      name: data.name,
      createdAt: Date.now(),
      createdBy: authUser.user.uid,
      description: data.description,
      industry: data.industry,
      website: data.website,
      image: data.image,
    };
    let orgDoc = await addDoc(colRef, orgData);

    let memberColRef = collection(FirestoreDB, "organizations", orgDoc.id, "members");
    let memberData: IMembers = {
      userId: authUser.user.uid,
      organizationId: orgDoc.id,
      permissions: {
        admin: true
      }
    }

    // Keep member ID same as user ID
    let memberDocRef = doc(memberColRef, authUser.user.uid)
    await setDoc(memberDocRef, memberData)

    if (!orgDoc.id) {
      Toaster.error("Organization creation failed");
    } else {
      Toaster.success("Organization created successfully");
      router.push("/(main)/organization-profile");
    }
  };

  const getOrganizations = async () => {
    setIsOrganizationsLoading(true);
    try {
      const userCredential = await signInAnonymously(AuthApp); // TODO: Remove after implementing proper auth

      // TODO: Remove
      // const organizationsRef = collection(FirestoreDB, "organizations");
      // const orgsSnapshot = await getDocs(organizationsRef);

      const membersColGroupRef = collectionGroup(FirestoreDB, "members");
      const orgsQuery = query(membersColGroupRef, where("userId", "==", userCredential.user.uid));
      const orgsSnapshot = await getDocs(orgsQuery);

      // If no organizations found, redirect to create new organization page
      if (orgsSnapshot.empty) {
        router.push("/(organization)/create-new-organization");
        return;
      }

      const data = orgsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }) as Organization);

      setCurrentOrganization(data[0]);
      setOrganizations(data);
    } catch (error) {
      console.error("Error getting organizations: ", error);
      Toaster.error("Failed to get organizations");
    } finally {
      setIsOrganizationsLoading(false);
    }
  };

  const updateOrganization = async (orgId: string, updatedData: Partial<IOrganizations>) => {
    const orgDocRef = doc(FirestoreDB, "organizations", orgId);

    try {
      await updateDoc(orgDocRef, updatedData);
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
