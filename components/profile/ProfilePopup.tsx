import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { styles } from "@/styles/header/EditProfile.styles";

interface ProfilePopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isVisible, onClose }) => {
  const [profileName, setProfileName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
  );

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
    if (profileName === "") {
      Toaster.error("Profile name is required");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Toaster.error("Passwords do not match");
      return;
    }
    Toaster.success("Profile updated successfully");
    onClose();
  };

  const handleCancel = () => {
    // Reset all changes
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
