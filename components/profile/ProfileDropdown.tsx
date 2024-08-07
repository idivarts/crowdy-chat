import { useState } from "react";
import { useRouter } from "expo-router";

import { View } from "../Themed";
import { useAuthContext } from "@/contexts";
import ProfilePopup from "./ProfilePopup";
import { toast } from "react-toastify";
import styles from "@/styles/profile/Profile.styles";
import DropdownButton from "../ui/dropdown-button/DropdownButton";

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
        <DropdownButton
          onPress={() => setProfilePopupVisible(true)}
          title="Edit Profile"
        />
        <DropdownButton
          onPress={handleSignout}
          title="Logout"
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
