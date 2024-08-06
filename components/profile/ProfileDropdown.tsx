import { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { View } from "../Themed";
import { useAuthContext } from "@/contexts";
import ProfilePopup from "./ProfilePopup";
import { toast } from "react-toastify";

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

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 10,
    gap: 10,
    width: 140,
  },
  dropdownText: {
    fontSize: 16,
  },
});

export default ProfileDropdown;
