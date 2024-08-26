import { IOrganizations } from "@/shared-libs/firestore/crowdy-chat/models/organizations";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { signInAnonymously } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";

interface OrganizationContextProps {
  currentOrganization: IOrganizations | undefined;
  getOrganizations: () => Promise<void>;
  isOrganizationsLoading: boolean;
  organizations: IOrganizations[];
  setCurrentOrganization: React.Dispatch<React.SetStateAction<IOrganizations | undefined>>;
  setOrganizations: React.Dispatch<React.SetStateAction<IOrganizations[]>>;
}

const OrganizationContext = createContext<OrganizationContextProps>(undefined!);

export const useOrganizationContext = () => useContext(OrganizationContext);

export const OrganizationContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentOrganization, setCurrentOrganization] = useState<IOrganizations | undefined>(undefined);
  const [organizations, setOrganizations] = useState<IOrganizations[]>([]);
  const [isOrganizationsLoading, setIsOrganizationsLoading] = useState<boolean>(true);

  const getOrganizations = async () => {
    setIsOrganizationsLoading(true);
    try {
      const userCredential = await signInAnonymously(AuthApp);
      console.log("Signed in anonymously:", userCredential.user);

      const organizationsRef = collection(FirestoreDB, "organizations");

      const snapshot = await getDocs(organizationsRef);
      console.log("snapshot", snapshot.docs);

      if (snapshot.empty) {
        setOrganizations([]);
        return;
      }

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }) as IOrganizations);
      setCurrentOrganization(data[0]);
      setOrganizations(data);
    } catch (error) {
      console.error("Error getting organizations: ", error);
    } finally {
      setIsOrganizationsLoading(false);
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization,
        getOrganizations,
        isOrganizationsLoading,
        organizations,
        setCurrentOrganization,
        setOrganizations,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
