import { View } from "react-native";
import CampaignCard from "./CampaignCard";
import { Campaign } from "@/types/campaign";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/campaigns/CampaignsList.styles";

interface CampaignsFilledStateProps {
  campaigns: Campaign[];
};

const CampaignsFilledState: React.FC<CampaignsFilledStateProps> = ({
  campaigns,
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <View style={styles.filledStateContainer}>
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} item={campaign} />
      ))}
    </View>
  );
};

export default CampaignsFilledState;
