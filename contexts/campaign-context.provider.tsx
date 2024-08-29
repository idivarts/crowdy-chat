import { initialCampaigns } from "@/constants/Campaigns";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { Campaign } from "@/types/campaign";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
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
  console.log(initialCampaigns);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const {
    currentOrganization,
  } = useOrganizationContext();

  const fetchCampaigns = async () => {
    await getCampaigns();
  }

  useEffect(() => {
    fetchCampaigns();
  }, [currentOrganization]);

  const getCampaigns = async () => {
    // Fetch data from Firebase
    const campaignsRef = collection(FirestoreDB, "campaigns");
    const campaignsQuery = query(campaignsRef, where("organizationId", "==", currentOrganization?.id));
    const campaignsSnapshot = await getDocs(campaignsQuery);

    const campaignsData = campaignsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as Campaign;
    });

    setCampaigns(campaignsData);

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
