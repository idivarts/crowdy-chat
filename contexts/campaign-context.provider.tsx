import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { Campaign } from "@/types/campaign";
import { collection, getDocs, } from "firebase/firestore";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";
import { useOrganizationContext } from "./organization-context.provider";

interface CampaignContextProps {
  campaigns: Campaign[];
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

    if (campaignsData.length > 0) {
      // @ts-ignore
      setCampaigns(campaignsData);
    }

    return campaignsData;
  }

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        getCampaigns,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
