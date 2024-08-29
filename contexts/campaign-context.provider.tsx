import { initialCampaigns } from "@/constants/Campaigns";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { Campaign } from "@/types/campaign";
import { collection, getDocs } from "firebase/firestore";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";

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

  const getCampaigns = async () => {
    // Fetch data from Firebase
    const campaignsRef = collection(FirestoreDB, "organizations");
    const campaignsDoc = await getDocs(campaignsRef);

    const campaignsData = campaignsDoc.docs.map((doc) => {
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
