import { TouchableOpacity } from "react-native";
import { router, usePathname } from "expo-router";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Text, View } from "../../components/Themed";
import { styles } from "./side-bar.styles";

interface SideBarMenuProps {}

const SIDE_BAR_MENU = [
  {
    href: '/(main)/(tabs)',
    label: 'Home',
  },
  {
    href: '/(campaigns)',
    label: 'Campaigns',
  },
  {
    href: '/(sources)',
    label: 'Sources',
  },
  {
    href: '/(leads)',
    label: 'Leads',
  },
];

const SideBarMenu: React.FC<SideBarMenuProps> = () => {
  const pathname = usePathname();
  const colorScheme = useColorScheme();

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
            gap: 6,
          }}
        >
          <View
            style={{
              gap: 8,
            }}
          >
            {
              SIDE_BAR_MENU.map((sideBarMenuItem, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    router.push(sideBarMenuItem.href);
                  }}
                  style={[
                    styles.sideBarMenuItem,
                    {
                      backgroundColor: pathname === sideBarMenuItem.href ? Colors.regular.orange : Colors[colorScheme].background,
                    }
                  ]}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      darkColor={pathname === sideBarMenuItem.href ? Colors.regular.white : Colors[colorScheme].tint}
                      lightColor={pathname === sideBarMenuItem.href ? Colors.regular.white : Colors[colorScheme].tint}
                    >
                      {sideBarMenuItem.label}
                    </Text>
                    <Ionicons
                      name={"chevron-forward"}
                      size={24}
                      color={pathname === sideBarMenuItem.href ? Colors.regular.white : Colors[colorScheme].tint}
                    />
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default SideBarMenu;
