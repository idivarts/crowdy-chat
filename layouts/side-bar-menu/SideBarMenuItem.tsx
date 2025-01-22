import { Text, View } from "@/components/Themed";
import { Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { stylesFn } from "./side-bar.styles";
import { useOrganizationContext } from "@/contexts";
import { Organization } from "@/types/Organization";
import { Avatar, } from "react-native-paper";
import { imageUrl } from "@/helpers/imageurl";
import { useBreakPoints } from "@/hooks";
import Colors from "@/constants/Colors";

interface SideBarMenuItemProps {
  active?: boolean;
  organization: Organization;
  label: string;
}

const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({
  active,
  organization,
  label,
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const { lg } = useBreakPoints();
  const { changeOrganization } = useOrganizationContext();

  return (
    <Pressable
      onPress={() => {
        changeOrganization(organization);
      }}
    >
      <View
        style={[
          styles.organizationCard,
          {
            backgroundColor: active
              ? Colors(theme).primary
              : Colors(theme).background,
          },
        ]}
      >
        <Avatar.Image
          source={imageUrl(organization.image)}
          size={lg ? 50 : 40}
        />
        <Text
          style={[
            styles.organizationName,
            {
              color: active
                ? Colors(theme).white
                : Colors(theme).black,
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default SideBarMenuItem;
