import { Drawer } from "expo-router/drawer";
import SideBarMenu from "@/layouts/side-bar-menu";
import { useBreakPoints } from "@/hooks";
import Header from "@/layouts/header";
import { View } from "@/components/Themed";
import { useAuthContext } from "@/contexts";
import { useEffect } from "react";

const DrawerLayout = () => {
  const { lg } = useBreakPoints();
  return (
    <>
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
            name="(campaigns)/campaigns"
            options={{
              headerShown: false,
              title: "Campaigns",
            }}
          />
          <Drawer.Screen
            key="sources"
            name="(sources)/sources"
            options={{
              headerShown: true,
              title: "Sources",
            }}
          />
          <Drawer.Screen
            key="leads"
            name="(leads)/leads"
            options={{
              headerShown: true,
              title: "Leads",
            }}
          />
          <Drawer.Screen
            key="open-ai"
            name="(openAI)/open-ai"
            options={{
              headerShown: true,
              title: "OpenAI",
            }}
          />
          <Drawer.Screen
            key="organization-profile"
            name="(organization)/organization-profile"
            options={{
              headerShown: true,
              title: "Organization Profile",
            }}
          />
        </Drawer>
      </View>
    </>
  );
};

export default DrawerLayout;
