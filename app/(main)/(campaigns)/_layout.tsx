import { DrawerToggle } from "@/components/ui";
import { useAuthContext } from "@/contexts";
import { useBreakPoints } from "@/hooks";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

const GoBackButton = () => {
  const navigation = useNavigation();
  return <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />;
};

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
          headerLeft: () => <GoBackButton />,
          headerBackTitleVisible: false,
          title: "Campaign",
        }}
      />
      <Stack.Screen
        name="campaigns/create"
        options={{
          headerLeft: () => <GoBackButton />,
          title: "Create Campaign",
        }}
      />
    </Stack>
  );
};

export default CampaignsLayout;
