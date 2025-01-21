import { Text, View } from "../Themed";
import {
  faComment,
  faFileLines,
  faHandshake,
  faStar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faComment as faCommentSolid,
  faFileLines as faFileLinesSolid,
  faHandshake as faHandshakeSolid,
  faStar as faStarSolid,
  faUser as faUserSolid,
} from "@fortawesome/free-solid-svg-icons";
import DrawerMenuItem, { IconPropFn } from "./DrawerMenuItem";
import BrandActionItem from "./BrandActionItem";
import { Platform, ScrollView } from "react-native";
import useBreakpoints from "@/hooks/use-breakpoints";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import OrganizationSwitcherMenu from "../org-switcher";
import { useOrganizationContext } from "@/contexts";

interface DrawerMenuContentProps { }

const DRAWER_MENU_CONTENT_ITEMS = [
  {
    href: "/campaigns",
    icon: ({ focused }: IconPropFn) => (focused ? faStarSolid : faStar),
    label: "Campaigns",
  },
  {
    href: "/sources",
    icon: ({ focused }: IconPropFn) => (focused ? faUserSolid : faUser),
    label: "Sources",
  },
  {
    href: "/leads",
    icon: ({ focused }: IconPropFn) =>
      focused ? faFileLinesSolid : faFileLines,
    label: "Leads",
  },
  {
    href: "/members",
    icon: ({ focused }: IconPropFn) =>
      focused ? faHandshakeSolid : faHandshake,
    label: "Members",
  },
  {
    href: "/open-ai",
    icon: ({ focused }: IconPropFn) => (focused ? faCommentSolid : faComment),
    label: "Open AI",
  },
];

const DrawerMenuContent: React.FC<DrawerMenuContentProps> = () => {
  const { xl } = useBreakpoints();
  const navigation = useNavigation();
  const router = useRouter();
  const { currentOrganization } = useOrganizationContext();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "web" ? 0 : 64,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 16,
        }}
      >
        <Text
          style={{
            paddingLeft: 16,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {currentOrganization?.name}
        </Text>
        <OrganizationSwitcherMenu />
      </View>
      <ScrollView
        style={{
          flex: 1,
          gap: 6,
        }}
      >
        <View>
          {DRAWER_MENU_CONTENT_ITEMS.map((tab, index) => (
            <DrawerMenuItem key={index} tab={tab} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          marginBottom: Platform.OS === "android" ? 24 : 5,
        }}
      >
        <BrandActionItem
          key="create-new-organization"
          icon="plus"
          showChevron={false}
          onPress={() => {
            router.push("/create-new-organization");
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
          title="Create New Organization"
        />
        <BrandActionItem
          key="organization-profile"
          icon="account-edit"
          showChevron={false}
          onPress={() => {
            router.push("/(main)/organization-profile");
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
          title="Edit Organization Profile"
        />
      </View>
    </View>
  );
};

export default DrawerMenuContent;
