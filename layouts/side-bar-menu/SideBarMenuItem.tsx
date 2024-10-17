import { Text, View } from "@/components/Themed";
import { Href, usePathname, useRouter } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { stylesFn } from "./side-bar.styles";

interface SideBarMenuItemProps {
  href: string;
  label: string;
}

const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({
  href,
  label,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <Pressable
      onPress={() => {
        router.push(href as Href);
      }}
    >
      <View
        style={[
          styles.sideBarMenuItem,
          {
            backgroundColor: href.includes(pathname) ? Colors(theme).primary : Colors(theme).background,
          }
        ]}
      >
        <View
          style={{
            alignItems: 'center',
            cursor: 'pointer',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
          }}
        >
          <Text
            darkColor={href.includes(pathname) ? Colors(theme).white : Colors(theme).primary}
            lightColor={href.includes(pathname) ? Colors(theme).white : Colors(theme).primary}
          >
            {label}
          </Text>
          <Ionicons
            name={"chevron-forward"}
            size={24}
            color={href.includes(pathname) ? Colors(theme).white : Colors(theme).primary}
          />
        </View>
      </View>
    </Pressable>
  );
}

export default SideBarMenuItem;
