import React, { useState } from "react";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { useAuthContext } from "@/contexts";
import { useProfilePopupContext } from "@/contexts/profile-popup-context.provider";
import ProfileIcon from "./ProfileIcon";
import MenuItem from "../ui/menu/MenuItem";
import Menu from "../ui/menu/Menu";
import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

const Profile = () => {
  const { signOut } = useAuthContext();
  const { setProfilePopupVisible } = useProfilePopupContext();
  const router = useRouter();
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSignout = () => {
    signOut();
    Toaster.success("Logged out successfully!");
    router.replace("/login");
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => {
        setMenuVisible(false);
      }}
      anchor={
        <Pressable onPress={() => setMenuVisible(true)}>
          <ProfileIcon size={40} />
        </Pressable>
      }
    >
      <>
        <MenuItem
          key="edit"
          title="Edit Profile"
          onPress={() => {
            setProfilePopupVisible(true);
          }}
          style={{
            backgroundColor: Colors(theme).background,
          }}
          titleStyle={{
            color: Colors(theme).text,
          }}
        />
        <MenuItem
          key="delete"
          title="Logout"
          onPress={handleSignout}
          style={{
            backgroundColor: Colors(theme).background,
          }}
          titleStyle={{
            color: Colors(theme).text,
          }}
        />
      </>
    </Menu>
  );
};

export default Profile;
