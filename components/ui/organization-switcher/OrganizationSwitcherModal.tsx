import React from "react";
import { Modal, View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";

type Organization = {
  id: number;
  name: string;
  image: string;
};

interface OrganizationSwitcherModalProps {
  organizations: Organization[];
  visible: boolean;
  onClose: () => void;
  onSwitch: (organizationId: number) => void;
}

const OrganizationSwitcherModal: React.FC<OrganizationSwitcherModalProps> = ({
  organizations,
  visible,
  onClose,
  onSwitch,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>List of Organizations</Text>
          <FlatList
            data={organizations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.switchButton}
                  onPress={() => onSwitch(item.id)}
                >
                  <Text style={styles.switchButtonText}>Switch</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    width: "100%",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  switchButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  switchButtonText: {
    color: "white",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FF4444",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
});

export default OrganizationSwitcherModal;
