import { DrawerContentScrollView } from "@react-navigation/drawer";
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

interface DrawerMenuContentProps {}

const DRAWER_MENU_CONTENT_ITEMS = [
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
  {
    href: "/campaigns",
    icon: ({ focused }: IconPropFn) => (focused ? faStarSolid : faStar),
    label: "Campaigns",
  },
  {
    href: "/leads",
    icon: ({ focused }: IconPropFn) =>
      focused ? faFileLinesSolid : faFileLines,
    label: "Leads",
  },
  {
    href: "/sources",
    icon: ({ focused }: IconPropFn) => (focused ? faUserSolid : faUser),
    label: "Sources",
  },
];

const DrawerMenuContent: React.FC<DrawerMenuContentProps> = () => {
  const { xl } = useBreakpoints();
  const navigation = useNavigation();
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "web" ? 12 : 64,
      }}
    >
      <View>
        <Text
          style={{
            paddingHorizontal: 24,
            paddingTop: 8,
            paddingBottom: 16,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Crowdy Chat
        </Text>
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
          marginBottom: Platform.OS === "android" ? 24 : 44,
        }}
      >
        <BrandActionItem
          key="create-brand"
          icon="plus"
          showChevron={false}
          onPress={() => {
            router.push("/create-new-organization");
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
          title="Create New Organization"
        />
        <BrandActionItem
          key="create-brand"
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
