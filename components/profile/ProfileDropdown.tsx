import { useState } from "react";
import { Button } from "react-native";
import { useRouter } from "expo-router";

import { View } from "../Themed";
import { useAuthContext } from "@/contexts";
import ProfilePopup from "./ProfilePopup";
import { toast } from "react-toastify";
import styles from "@/styles/profile/Profile.styles";

const ProfileDropdown = () => {
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const { signOut } = useAuthContext();
  const router = useRouter();

  const handleSignout = () => {
    signOut();
    toast.success("Logged out successfully!");
    router.replace('/(auth)/login');
  }

  return (
    <>
      <View style={styles.dropdown}>
        <Button
          title="Edit Profile"
          onPress={() => setProfilePopupVisible(true)}
        />
        <Button
          title="Logout"
          onPress={handleSignout}
        />
      </View>

      {
        isProfilePopupVisible && (
          <ProfilePopup
            visible={isProfilePopupVisible}
            onClose={() => setProfilePopupVisible(false)}
          />
        )
      }
    </>
  );
};

export default ProfileDropdown;
