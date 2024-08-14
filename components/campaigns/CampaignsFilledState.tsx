import { View } from "react-native";
import CampaignCard from "./CampaignCard";
import styles from "@/styles/campaigns/CampaignsList.styles";
import { Campaign } from "@/types/campaign";

interface CampaignsFilledStateProps {
  campaigns: Campaign[];
};

const CampaignsFilledState: React.FC<CampaignsFilledStateProps> = ({
  campaigns,
}) => {
  return (
    <View style={styles.filledStateContainer}>
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} item={campaign} />
      ))}
    </View>
  );
};

export default CampaignsFilledState;
