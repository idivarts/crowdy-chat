import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { Campaign } from "@/types/campaign";
import { collection, deleteDoc, doc, getDocs, } from "firebase/firestore";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useOrganizationContext } from "./organization-context.provider";
import Toaster from "@/shared-uis/components/toaster/Toaster";

interface CampaignContextProps {
  campaigns: Campaign[];
  deleteCampaign: (campaignId: string) => void;
  getCampaigns: () => void;
}

const CampaignContext = createContext<CampaignContextProps>(null!);

export const useCampaignContext = () => useContext(CampaignContext);

export const CampaignContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const {
    currentOrganization,
  } = useOrganizationContext();

  useEffect(() => {
    if (currentOrganization) {
      getCampaigns();
    }
  }, [currentOrganization]);

  const getCampaigns = async () => {
    const campaignsRef = collection(FirestoreDB, `/organizations/${currentOrganization?.id}/campaigns`);
    const campaignsSnapshot = await getDocs(campaignsRef);

    const campaignsData = campaignsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        // Replace with correct implementation
        image: 'https://via.placeholder.com/150',
        totalConversions: 100,
        totalLeads: 10,
        totalPages: 3,

      } as Campaign;
    });

    if (campaignsData) {
      // @ts-ignore
      setCampaigns(campaignsData);
    }

    return campaignsData;
  }

  const deleteCampaign = async (campaignId: string) => {
    try {
      if (!currentOrganization?.id || !campaignId) {
        console.error('Invalid organization ID or campaign ID.');
        return;
      }

      const docRef = doc(FirestoreDB, `/organizations/${currentOrganization?.id}/campaigns`, campaignId);
      await deleteDoc(docRef);
      Toaster.success("Campaign deleted successfully");
      getCampaigns();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        deleteCampaign,
        getCampaigns,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
