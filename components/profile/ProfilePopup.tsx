import { Button, Modal, StyleSheet } from "react-native";
import { Text, View } from "../Themed";

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
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.title}>Edit Profile</Text>
          <Button title="Close" onPress={() => onClose()} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfilePopup;
