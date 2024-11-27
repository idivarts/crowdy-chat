import { DrawerToggle } from "@/components/ui";
import { useAuthContext } from "@/contexts";
import { useBreakPoints } from "@/hooks";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "@/components/Themed";
import GoBackButton from "@/components/ui/go-back-button";
import { CampaignContextProvider } from "@/contexts/campaign-context.provider";
import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

const CampaignsLayout = () => {
  const { lg } = useBreakPoints();
  const theme = useTheme();

  const { isLoading, session } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/(auth)/login");
    }
  }, [isLoading, session]);

  return (
    <CampaignContextProvider>
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <GoBackButton />
                {!lg && <DrawerToggle />}
              </View>
            ),
            title: "Create Campaign",
            headerShown: true,

            headerStyle: {
              backgroundColor: Colors(theme).background,
            },
          }}
        />
        <Stack.Screen
          name="campaigns/edit/[pageID]"
          options={{
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <GoBackButton />
                {!lg && <DrawerToggle />}
              </View>
            ),
            title: "Edit Campaign",
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors(theme).background,
            },
          }}
        />
      </Stack>
    </CampaignContextProvider>
  );
};

export default CampaignsLayout;
