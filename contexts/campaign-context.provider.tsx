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
import { initialCampaigns } from "@/constants/Campaigns";

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
    // const campaignsRef = collection(FirestoreDB, `/organizations/${currentOrganization?.id}/campaigns`);
    // const campaignsSnapshot = await getDocs(campaignsRef);

    // const campaignsData = campaignsSnapshot.docs.map((doc) => {
    //   return {
    //     id: doc.id,
    //     ...doc.data(),
    //   } as Campaign;
    // });

    // Remove after campaign creation is implemented
    const campaignsData = initialCampaigns.filter((campaign) => campaign.organizationId === currentOrganization?.id);
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
