import { Drawer } from "expo-router/drawer";
import SideBarMenu from "@/layouts/side-bar-menu";
import { useBreakPoints } from "@/hooks";
import Header from "@/layouts/header";
import { View } from "@/components/Themed";
import { useAuthContext } from "@/contexts";
import { useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { CampaignContextProvider } from "@/contexts/campaign-context.provider";
import DrawerMenuContent from "@/components/drawer-layout/DrawerMenuContent";
import { Platform } from "react-native";

const DrawerLayout = () => {
  const { lg } = useBreakPoints();
  return (
    <CampaignContextProvider>
      <View
        style={{
          flex: 1,
        }}
      >
        <Drawer
          backBehavior="history"
          drawerContent={() =>
            Platform.OS !== "web" ? <SideBarMenu /> : <DrawerMenuContent />
          }
          screenOptions={{
            drawerType: lg ? "permanent" : "slide",
            headerShown: false,
          }}
        >
          {/* <Drawer.Screen
            key="campaigns"
            name="/(tabs)/campaigns"
            options={{
              headerShown: false,
              title: "Campaigns",
            }}
          />
          <Drawer.Screen
            key="sources"
            name="/(tabs)/sources"
            options={{
              headerShown: false,
              title: "Sources",
            }}
          />
          <Drawer.Screen
            key="leads"
            name="/(tabs)/leads"
            options={{
              headerShown: false,
              title: "Leads",
            }}
          />
          <Drawer.Screen
            key="open-ai"
            name="/(tabs)/open-ai"
            options={{
              headerShown: false,
              title: "OpenAI",
            }}
          />
          <Drawer.Screen
            key="organization-profile"
            name="/(tabs)/organization"
            options={{
              headerShown: false,
              title: "Organization Profile",
            }}
          /> */}
          <Drawer.Screen
            key="(drawer)"
            name="(tabs)"
            options={{
              headerShown: false,
              title: "Organization Profile",
            }}
          />
          <Drawer.Screen
            key="(screens)"
            name="(organization)"
            options={{
              headerShown: false,
              title: "Organization Profile",
            }}
          />
        </Drawer>
      </View>
    </CampaignContextProvider>
  );
};

export default DrawerLayout;
