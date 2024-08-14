import { View } from "react-native"
import CampaignCard from "./CampaignCard"
import styles from "@/styles/campaigns/CampaignsList.styles";

interface CampaignsFilledStateProps {
  campaigns: any[];
}

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
