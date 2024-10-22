import { Image } from "react-native";
import Button from "../ui/button/Button";
import { router } from "expo-router";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/campaigns/CampaignsList.styles";
import { Text, View } from "../Themed";

const CampaignsEmptyState = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <View style={styles.emptyStateContainer}>
      <Image
        source={{ uri: "https://via.placeholder.com/300" }}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>No Campaigns yet</Text>
      <Button
        mode="contained"
        onPress={() => router.push("/campaigns/create")}
      >
        Create Campaign
      </Button>
    </View>
  );
};

export default CampaignsEmptyState;
