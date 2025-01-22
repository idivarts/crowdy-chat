import { Drawer } from "expo-router/drawer";
import SideBarMenu from "@/layouts/side-bar-menu";
import { useBreakPoints } from "@/hooks";
import { View } from "@/components/Themed";
import { CampaignContextProvider } from "@/contexts/campaign-context.provider";
import DrawerMenuContent from "@/components/drawer-layout/DrawerMenuContent";
import { Platform } from "react-native";

const DrawerLayout = () => {
  const { xl } = useBreakPoints();

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
            drawerType: xl ? "permanent" : "slide",
            headerShown: false,
          }}
        >
          <Drawer.Screen
            key="(tabs)"
            name="(tabs)"
            options={{
              headerShown: false,
              title: "Organization Profile",
            }}
          />
          <Drawer.Screen
            key="(organization)"
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
