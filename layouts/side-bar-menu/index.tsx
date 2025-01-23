import { DrawerContentScrollView } from "@react-navigation/drawer";

import { Text, View } from "../../components/Themed";
import SideBarMenuItem from "./SideBarMenuItem";
import { Platform, Pressable } from "react-native";
import { useOrganizationContext } from "@/contexts";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { stylesFn } from "./side-bar.styles";
import { Href, router, usePathname } from "expo-router";
import { useTheme } from "@react-navigation/native";
import AppLayout from "../app-layout";

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
  const { organizations, currentOrganization } = useOrganizationContext();
  const pathname = usePathname();
  const theme = useTheme();
  const styles = stylesFn(theme);
  return (
    <AppLayout>
      <View
        style={{
          flex: 1,
        }}
      >
        <DrawerContentScrollView
          style={{
            flex: 1,
            marginTop: Platform.OS === "web" ? 0 : -60,
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
              <Text
                style={{
                  padding: 16,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: Colors(theme).text,
                }}
              >
                Organizations
              </Text>
              {organizations.map((organization) => (
                <SideBarMenuItem
                  active={currentOrganization?.id === organization.id}
                  key={organization.id}
                  organization={organization}
                  label={organization.name}
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
          {SIDE_BAR_MENU_BOTTOM.map((item) => (
            <Pressable
              key={item.href}
              onPress={() => {
                router.push(item.href as Href);
              }}
            >
              <View
                style={[
                  styles.sideBarMenuItem,
                  {
                    backgroundColor: item.href.includes(pathname)
                      ? Colors(theme).primary
                      : Colors(theme).background,
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
                  <Text>{item.label}</Text>
                  <Ionicons
                    name={"chevron-forward"}
                    size={24}
                    color={
                      item.href.includes(pathname)
                        ? Colors(theme).white
                        : Colors(theme).primary
                    }
                  />
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </AppLayout>
  );
};

export default SideBarMenu;
