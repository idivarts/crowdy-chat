import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { styles } from "@/styles/header/EditProfile.styles";
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
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import Toast from "react-native-toast-message";

interface ProfilePopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isVisible, onClose }) => {
  const auth = AuthApp;

  const [profileName, setProfileName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
  );

  const fetchUserProfile = async () => {
    const user = auth.currentUser;
    if (!user || !user.uid) return;

    const userDocRef = doc(FirestoreDB, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as IUser;
      if (!userData) return;
      setProfileName(userData.name || "");
      setProfileImage(userData.image || profileImage);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Profile Name"
              value={profileName}
              onChangeText={setProfileName}
            />
          </View>

          <View style={styles.section}>
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />
          </View>

          <View style={styles.footer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProfilePopup;
