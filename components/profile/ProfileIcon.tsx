import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, ActivityIndicator } from "react-native";
import { ComponentProps, useEffect, useState } from "react";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { useAuthContext } from "@/contexts";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/profile/Profile.styles";

interface ProfileIconProps {
  iconColor?: string;
  iconName?: ComponentProps<typeof Ionicons>["name"];
  size?: number;
  profileURL?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  size = 40,
  iconName = "person",
  iconColor,
  profileURL,
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    profileURL
  );
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(AuthApp.currentUser);
  // useas different name
  // const {user} = useAuthContext();
  const { user: AuthUser } = useAuthContext();

  useEffect(() => {
    const unsubscribe = AuthApp.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setProfileImage(AuthUser?.image);
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  useEffect(() => {
    // Update the profile image whenever AuthUser changes
    if (AuthUser?.image) {
      setProfileImage(AuthUser.image);
    }
  }, [AuthUser?.image]);

  if (loading) {
    return (
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="small" color={Colors(theme).primary} />
      </View>
    );
  }

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      {profileImage ? (
        <Image
          source={{ uri: profileImage }}
          style={[
            styles.profileIconContainer,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
      ) : (
        <Ionicons
          name={iconName}
          size={size}
          color={iconColor || Colors(theme).primary}
        />
      )}
    </View>
  );
};

export default ProfileIcon;
