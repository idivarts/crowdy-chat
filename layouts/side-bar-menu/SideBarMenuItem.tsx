import { Text, View } from "@/components/Themed";
import { usePathname, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { styles } from "./side-bar.styles";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

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
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() => {
        router.push(href);
      }}
    >
      <View
        style={[
          styles.sideBarMenuItem,
          {
            backgroundColor: href.includes(pathname) ? Colors.regular.primary : Colors[colorScheme].background,
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
            darkColor={href.includes(pathname) ? Colors.regular.white : Colors.regular.primary}
            lightColor={href.includes(pathname) ? Colors.regular.white : Colors.regular.primary}
          >
            {label}
          </Text>
          <Ionicons
            name={"chevron-forward"}
            size={24}
            color={href.includes(pathname) ? Colors.regular.white : Colors.regular.primary}
          />
        </View>
      </View>
    </Pressable>
  );
}

export default SideBarMenuItem;
