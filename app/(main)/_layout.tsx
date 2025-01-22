import { CampaignContextProvider } from "@/contexts/campaign-context.provider";
import { Stack } from "expo-router";

const DrawerLayout = () => {
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
          name="(drawer)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(screens)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(campaigns)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </CampaignContextProvider>
  );
};

export default DrawerLayout;
