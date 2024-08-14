import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styles from "@/styles/campaigns/CampaignsList.styles";
import Button from "../ui/button/Button";
import { router } from "expo-router";

const CampaignsEmptyState = () => {
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
