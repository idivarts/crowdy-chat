import { Pressable } from "react-native";
import { router, usePathname } from "expo-router";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Text, View } from "../../components/Themed";
import { styles } from "./side-bar.styles";

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
];

const SideBarMenu: React.FC = () => {
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
            {SIDE_BAR_MENU.map((sideBarMenuItem, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  router.push(sideBarMenuItem.href);
                }}
              >
                <View
                  style={[
                    styles.sideBarMenuItem,
                    {
                      backgroundColor: sideBarMenuItem.href.includes(pathname)
                        ? Colors[colorScheme].tint
                        : Colors[colorScheme].background,
                    },
                  ]}
                >
                  <View
                    style={{
                      alignItems: "center",
                      cursor: "pointer",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Text
                      darkColor={
                        sideBarMenuItem.href.includes(pathname)
                          ? Colors.regular.white
                          : Colors[colorScheme].tint
                      }
                      lightColor={
                        sideBarMenuItem.href.includes(pathname)
                          ? Colors.regular.white
                          : Colors[colorScheme].tint
                      }
                    >
                      {sideBarMenuItem.label}
                    </Text>
                    <Ionicons
                      name={"chevron-forward"}
                      size={24}
                      color={
                        sideBarMenuItem.href.includes(pathname)
                          ? Colors.regular.white
                          : Colors[colorScheme].tint
                      }
                    />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default SideBarMenu;
