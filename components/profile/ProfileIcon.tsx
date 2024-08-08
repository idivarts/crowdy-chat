import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import styles from "@/styles/profile/Profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

interface ProfileIconProps {
  iconColor?: string;
  iconName?: ComponentProps<typeof Ionicons>['name'];
  size?: number;
};

const ProfileIcon: React.FC<ProfileIconProps> = ({
  size = 40,
  iconName = 'person',
  iconColor,
}) => {
  return (
    <View style={[styles.profileIconContainer, { width: size, height: size, borderRadius: size / 2 }]}>
      <Ionicons
        color={iconColor ?? Colors.regular.white}
        name={iconName}
        size={size * 0.6}
      />
    </View>
  );
};

export default ProfileIcon;
