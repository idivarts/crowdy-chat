import { Button, Modal } from "react-native";
import { Text, View } from "../Themed";
import styles from "@/styles/profile/Profile.styles";

interface ProfilePopupProps {
  visible: boolean;
  onClose: () => void;
};

const ProfilePopup: React.FC<ProfilePopupProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.profilePopupContainer}>
        <View style={styles.popup}>
          <Text style={styles.title}>Edit Profile</Text>
          <Button title="Close" onPress={() => onClose()} />
        </View>
      </View>
    </Modal>
  );
};

export default ProfilePopup;
