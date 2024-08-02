import { Drawer } from "expo-router/drawer";
import SideBarMenu from "@/layouts/side-bar-menu";
import { useAuthContext } from "@/contexts";
import { router } from "expo-router";
import { useEffect } from "react";

const DrawerLayout = () => {
  const { session } = useAuthContext();

  // useEffect(() => {
  //   if (!session) {
  //     router.replace('(auth)/login');
  //   }
  // }, [session]);

  return (
    <Drawer
      backBehavior="history"
      drawerContent={(props) => <SideBarMenu {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="(campaigns)"
        options={{
          headerShown: true,
          title: 'Campaigns',
        }}
      />
      <Drawer.Screen
        name="(sources)"
        options={{
          headerShown: true,
          title: 'Sources',
        }}
      />
      <Drawer.Screen
        name="(leads)"
        options={{
          headerShown: true,
          title: 'Leads',
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
