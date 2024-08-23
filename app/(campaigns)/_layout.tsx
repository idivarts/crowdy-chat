import { View } from "@/components/Themed";
import { useAuthContext } from "@/contexts";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const CampaignsLayout = () => {
  const { isLoading, session } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/(auth)/login");
    }
  }, [isLoading, session]);

  return (
    <>
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
            name="campaign-detailed-view/[pageID]"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="campaigns-open-view/:pageId"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </>
  );
};

export default CampaignsLayout;
