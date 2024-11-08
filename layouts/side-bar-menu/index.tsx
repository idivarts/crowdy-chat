import { DrawerContentScrollView } from "@react-navigation/drawer";

import { View } from "../../components/Themed";
import SideBarMenuItem from "./SideBarMenuItem";
import { Platform } from "react-native";

const SIDE_BAR_MENU = [
  {
    href: "/campaigns",
    label: "Campaigns",
  },
  {
    href: "/sources",
    label: "Sources",
  },
  {
    href: "/leads",
    label: "Leads",
  },
  {
    href: "/open-ai",
    label: "OpenAI",
  },
  {
    href: "/members",
    label: "Members",
  },
];

const SIDE_BAR_MENU_BOTTOM = [
  {
    href: "/create-new-organization",
    label: "Create New Organization",
  },
  {
    href: "/organization-profile",
    label: "Organization Profile",
  },
];

const SideBarMenu: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <DrawerContentScrollView
        style={{
          flex: 1,
          marginTop: Platform.OS === 'web' ? 0 : -60,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              gap: 8,
            }}
          >
            {SIDE_BAR_MENU.map((sideBarMenuItem, index) => (
              <SideBarMenuItem
                key={index}
                href={sideBarMenuItem.href}
                label={sideBarMenuItem.label}
              />
            ))}
          </View>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopColor: "lightgray",
          borderTopWidth: 1,
          paddingBottom: 16,
          paddingTop: 16,
        }}
      >
        {SIDE_BAR_MENU_BOTTOM.map((sideBarMenuItem, index) => (
          <SideBarMenuItem
            key={index}
            href={sideBarMenuItem.href}
            label={sideBarMenuItem.label}
          />
        ))}
      </View>
    </View>
  );
};

export default SideBarMenu;
