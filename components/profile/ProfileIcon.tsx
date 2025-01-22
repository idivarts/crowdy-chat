import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useAuthContext } from "@/contexts";
import { imageUrl } from "@/helpers/imageurl";
import { AuthApp } from "@/shared-libs/utilities/auth";
import stylesFn from "@/styles/profile/Profile.styles";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";

interface ProfileIconProps {
  iconColor?: string;
  icon?: IconProp;
  size?: number;
  profileURL?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  size = 40,
  icon = faPerson,
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
          source={imageUrl(profileImage)}
          style={[
            styles.profileIconContainer,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
      ) : (
        <FontAwesomeIcon
          icon={icon}
          size={size}
          color={iconColor || Colors(theme).primary}
        />
      )}
    </View>
  );
};

export default ProfileIcon;
