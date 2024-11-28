import { Drawer } from "expo-router/drawer";
import SideBarMenu from "@/layouts/side-bar-menu";
import { useBreakPoints } from "@/hooks";
import Header from "@/layouts/header";
import { View } from "@/components/Themed";
import { useAuthContext } from "@/contexts";
import { useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { CampaignContextProvider } from "@/contexts/campaign-context.provider";
import { Stack } from "expo-router";

const DrawerLayout = () => {
  const { lg } = useBreakPoints();
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
