import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import styles from "@/styles/profile/Profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable } from "react-native";

interface ProfileIconProps {
  iconColor?: string;
  iconName?: ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
  size?: number;
};

const ProfileIcon: React.FC<ProfileIconProps> = ({
  size = 40,
  iconName = 'person',
  onPress,
  iconColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      <View style={[styles.profileIconContainer, { width: size, height: size, borderRadius: size / 2 }]}>
        <Ionicons
          color={iconColor ? iconColor : Colors.regular.white}
          name={iconName}
          size={size * 0.6}
        />
      </View>
    </Pressable>
  );
};

export default ProfileIcon;
