import { View } from "@/components/Themed";
import AppLayout from "@/layouts/app-layout";
import { Stack } from "expo-router";

const CampaignsLayout = () => {
  return (
    <AppLayout>
      <View
        style={{
          flex: 1,
        }}
      >
        <Stack
          screenOptions={{
            animation: "ios",
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="campaign-detailed-view"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="campaign-detailed-view/:pageId"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </AppLayout>
  );
};

export default CampaignsLayout;
