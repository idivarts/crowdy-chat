import AppLayout from "@/layouts/app-layout";

import { Text, View } from "@/components/Themed";
import { Button } from "react-native";
import { useRouter } from "expo-router";

const Campaigns = () => {
  const router = useRouter();
  return (
    <AppLayout>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text>Campaigns</Text>
        <Button
          title="Create Campaign"
          onPress={() => router.push('/campaign')}
        />
      </View>
    </AppLayout>
  );
};

export default Campaigns;
