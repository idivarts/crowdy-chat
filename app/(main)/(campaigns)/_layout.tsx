import { DrawerToggle } from "@/components/ui";
import { useAuthContext } from "@/contexts";
import { useBreakPoints } from "@/hooks";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { View } from "@/components/Themed";

const GoBackButton = () => {
  const navigation = useNavigation();
  const { lg } = useBreakPoints();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {!lg && <DrawerToggle />}
      <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
    </View>
  );
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
