import { DrawerToggle } from "@/components/ui";
import { useAuthContext, useOrganizationContext } from "@/contexts";
import { useBreakPoints } from "@/hooks";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "@/components/Themed";
import GoBackButton from "@/components/ui/go-back-button";
import { ActivityIndicator } from "react-native";

const CampaignsLayout = () => {
  const { lg } = useBreakPoints();

  const { isLoading, session } = useAuthContext();
  const { organizations } = useOrganizationContext();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/(auth)/login");
    }
  }, [isLoading, session]);

  if (isLoading || organizations.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    )
  }

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
          headerShown: false,
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
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default CampaignsLayout;
