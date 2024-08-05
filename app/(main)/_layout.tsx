import { Drawer } from "expo-router/drawer";
import SideBarMenu from "@/layouts/side-bar-menu";
import { useBreakPoints } from "@/hooks";

const DrawerLayout = () => {
  const { lg } = useBreakPoints();

  return (
    <Drawer
      backBehavior="history"
      drawerContent={() => <SideBarMenu />}
      screenOptions={{
        drawerType: lg ? 'permanent' : 'slide',
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="(campaigns)/campaigns"
        options={{
          headerShown: true,
          title: 'Campaigns',
        }}
      />
      <Drawer.Screen
        name="(sources)/sources"
        options={{
          headerShown: true,
          title: 'Sources',
        }}
      />
      <Drawer.Screen
        name="(leads)/leads"
        options={{
          headerShown: true,
          title: 'Leads',
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
