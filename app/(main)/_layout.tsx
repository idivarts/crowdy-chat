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
        key="campaigns"
        name="(campaigns)/campaigns"
        options={{
          headerShown: true,
          title: 'Campaigns',
        }}
      />
      <Drawer.Screen
        key="sources"
        name="(sources)/sources"
        options={{
          headerShown: true,
          title: 'Sources',
        }}
      />
      <Drawer.Screen
        key="leads"
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
