import { Text, View } from "@/components/Themed";
import { Href, usePathname, useRouter } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { stylesFn } from "./side-bar.styles";
import { useOrganizationContext } from "@/contexts";
import { Organization } from "@/types/Organization";
import { Avatar, Card } from "react-native-paper";

interface SideBarMenuItemProps {
  organization: Organization;
  label: string;
}

const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({
  organization,
  label,
}) => {
  const router = useRouter();

  const theme = useTheme();
  const styles = stylesFn(theme);
  const { changeOrganization } = useOrganizationContext();

  return (
    <Pressable
      onPress={() => {
        changeOrganization(organization);
        router.push("/");
      }}
    >
      <View style={styles.organizationCard}>
        <Avatar.Image source={{ uri: organization.image }} />
        <Text style={styles.organizationName}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default SideBarMenuItem;
