import { DrawerContentScrollView } from "@react-navigation/drawer";

import { View } from "../../components/Themed";
import SideBarMenuItem from "./SideBarMenuItem";

const SIDE_BAR_MENU = [
  {
    href: '/campaigns',
    label: 'Campaigns',
  },
  {
    href: '/sources',
    label: 'Sources',
  },
  {
    href: '/leads',
    label: 'Leads',
  },
  {
    href: '/members',
    label: 'Members',
  },
  {
    href: '/open-ai',
    label: 'OpenAI',
  },
];

const SIDE_BAR_MENU_BOTTOM = [
  {
    href: '/create-new-organization',
    label: 'Create New Organization',
  },
  {
    href: '/organization-profile',
    label: 'Organization Profile',
  },
];

const SideBarMenu: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <DrawerContentScrollView>
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
            {
              SIDE_BAR_MENU.map((sideBarMenuItem, index) => (
                <SideBarMenuItem
                  key={index}
                  href={sideBarMenuItem.href}
                  label={sideBarMenuItem.label}
                />
              ))
            }
          </View>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
          paddingBottom: 16,
          paddingTop: 16,
        }}
      >
        {
          SIDE_BAR_MENU_BOTTOM.map((sideBarMenuItem, index) => (
            <SideBarMenuItem
              key={index}
              href={sideBarMenuItem.href}
              label={sideBarMenuItem.label}
            />
          ))
        }
      </View>
    </View>
  );
};

export default SideBarMenu;
