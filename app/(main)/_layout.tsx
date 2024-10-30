import { Drawer } from "expo-router/drawer";
import SideBarMenu from "@/layouts/side-bar-menu";
import { useBreakPoints } from "@/hooks";
import Header from "@/layouts/header";
import { View } from "@/components/Themed";
import { useAuthContext } from "@/contexts";
import { useEffect } from "react";
import AppLayout from "@/layouts/app-layout";

const DrawerLayout = () => {
  const { lg } = useBreakPoints();
  return (
    <AppLayout>
      <Header />
      <View
        style={{
          flex: 1,
        }}
      >
        <Drawer
          backBehavior="history"
          drawerContent={() => <SideBarMenu />}
          screenOptions={{
            drawerType: lg ? "permanent" : "slide",
            headerShown: false,
          }}
        >
          <Drawer.Screen
            key="campaigns"
            name="(campaigns)"
            options={{
              headerShown: false,
              title: "Campaigns",
            }}
          />
          <Drawer.Screen
            key="sources"
            name="(sources)"
            options={{
              headerShown: true,
              title: "Sources",
            }}
          />
          <Drawer.Screen
            key="leads"
            name="(leads)"
            options={{
              headerShown: true,
              title: "Leads",
            }}
          />
          <Drawer.Screen
            key="open-ai"
            name="(openAI)"
            options={{
              headerShown: true,
              title: "OpenAI",
            }}
          />
          <Drawer.Screen
            key="organization-profile"
            name="(organization)"
            options={{
              headerShown: true,
              title: "Organization Profile",
            }}
          />
        </Drawer>
      </View>
    </AppLayout>
  );
};

export default DrawerLayout;
