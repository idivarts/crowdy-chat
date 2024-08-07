import AppLayout from "@/layouts/app-layout";

import { Text, View } from "@/components/Themed";
import { Button } from "react-native";
import { useRouter } from "expo-router";
import CreateCampaign from "@/components/modals/CampaignCreate";

const Campaigns = () => {
  const router = useRouter();
  return (
    <AppLayout>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text>Campaigns</Text>
        <CreateCampaign />
      </View>
    </AppLayout>
  );
};

export default Campaigns;
