import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import { Stack } from "expo-router";
import { View } from "@/components/Themed";
import GoBackButton from "@/components/ui/go-back-button";
import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

const CampaignsLayout = () => {
  const { lg } = useBreakPoints();
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        animation: "ios",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="campaigns/create"
        options={{
          headerLeft: () => (
            <GoBackButton />
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
            <GoBackButton />
          ),
          title: "Edit Campaign",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors(theme).background,
          },
        }}
      />
      <Stack.Screen
        name="textbox-page"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
    </Stack>
  );
};

export default CampaignsLayout;
