import React, { useState, useEffect } from "react";
import {
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { Switch } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { stylesFn } from "@/styles/header/EditProfile.styles";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { IUser } from "@/shared-libs/firestore/crowdy-chat/models/users";
import { StorageApp } from "@/shared-libs/utilities/storage";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import Toast from "react-native-toast-message";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "../Themed";
import TextInput from "../ui/text-input/TextInput";
import Button from "../ui/button/Button";
import { useAuthContext } from "@/contexts/auth-context.provider";

interface ProfilePopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isVisible, onClose }) => {
  const {
    user,
    updateUser,
  } = useAuthContext();
  const auth = AuthApp;
  const [profileName, setProfileName] = useState(user?.name || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(user?.image || "");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const theme = useTheme();
  const styles = stylesFn(theme);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (!user) {
      return;
    }

    updateUser(
      user?.id,
      {
        settings: {
          theme: isSwitchOn ? "light" : "dark"
        },
      },
    );
  };

  useEffect(() => {
    if (user?.settings?.theme) {
      setIsSwitchOn(user.settings.theme === "dark");
    }
  }, [user?.id]);

  const validatePasswords = (): boolean => {
    if (newPassword !== confirmNewPassword) {
      Toaster.error("New passwords do not match");
      return false;
    }
    if (newPassword.length < 6) {
      Toaster.error("New password should be at least 6 characters long");
      return false;
    }
    return true;
  };

  const updateUserPassword = async (): Promise<boolean> => {
    const user = auth.currentUser;
    if (!user || !user.email) return false;

    try {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      return true;
    } catch (error) {
      Toaster.error("Incorrect Old Password");
      return false;
    }
  };

  const updateUserDetails = async () => {
    const user = auth.currentUser;
    if (!user || !user.uid) {
      Toaster.error("User not authenticated");
      return;
    }

    try {
      const updates: Partial<IUser> = {};

      const userDocRef = doc(FirestoreDB, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as IUser;

        if (profileName !== userData.name) {
          updates.name = profileName;
        }

        if (profileImage !== userData.image) {
          const storageRef = ref(StorageApp, `users/${user.uid}/profile.jpg`);
          await uploadString(storageRef, profileImage, "data_url");

          const downloadURL = await getDownloadURL(storageRef);
          updates.image = downloadURL;
        }

        if (Object.keys(updates).length > 0) {
          await updateDoc(userDocRef, updates);
        }
      }

      if (oldPassword && newPassword) {
        if (!validatePasswords()) return;
        const passwordUpdated = await updateUserPassword();
        if (!passwordUpdated) return;
      }

      Toaster.success("Profile updated successfully");
      onClose();
    } catch (error) {
      Toaster.error("An error occurred while updating profile");
      console.error(error);
    }
  };

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const source = { uri: result.assets[0].uri };
      setProfileImage(source.uri);
    }
  };

  const handleSave = () => {
    if (profileName.trim() === "") {
      Toaster.error("Profile name is required");
      return;
    }
    updateUserDetails();
  };

  const handleCancel = () => {
    setProfileName("");
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <Toast />
        <View style={styles.popup}>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={styles.section}>
            <TouchableOpacity onPress={openImagePicker}>
              <Image
                source={
                  profileImage ? {
                    uri: profileImage
                  } : require("@/assets/images/placeholder-image.png")
                }
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Profile Name"
              value={profileName}
              onChangeText={setProfileName}
            />
            <TextInput
              placeholder="Old Password"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />
            <View
              style={styles.settingsRow}
            >
              <Text
                style={styles.settingsLabel}
              >
                Theme ({isSwitchOn ? "Dark" : "Light"})
              </Text>
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              onPress={handleSave}
            >
              Save
            </Button>
            <Button
              onPress={handleCancel}
            >
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProfilePopup;
