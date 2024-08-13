import { DrawerToggle } from "@/components/ui";
import { useAuthContext } from "@/contexts";
import { useBreakPoints } from "@/hooks";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { View } from "@/components/Themed";
import GoBackButton from "@/components/ui/go-back-button";

const CampaignsLayout = () => {
  const { lg } = useBreakPoints();

  const { isLoading, session } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/(auth)/login");
    }
  }, [isLoading, session]);

  return (
    <Stack
      screenOptions={{
        animation: "ios",
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="campaigns"
        options={{
          headerLeft: () => (lg ? null : <DrawerToggle />),
          title: "Campaigns",
        }}
      />
      <Stack.Screen
        name="campaign"
        options={{
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <GoBackButton />
              {!lg && <DrawerToggle />}
            </View>
          ),
          headerBackTitleVisible: false,
          title: "Campaign",
        }}
      />
      <Stack.Screen
        name="campaigns/create"
        options={{
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <GoBackButton />
              {!lg && <DrawerToggle />}
            </View>
          ),
          title: "Create Campaign",
        }}
      />
    </Stack>
  );
};

export default CampaignsLayout;
