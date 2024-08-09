import styles from "@/styles/organization-switcher/OrganizationSwitcherModal.styles";
import React from "react";
import { Modal, View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";

type Organization = {
  id: number;
  communityName: string;
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
                <Text style={styles.name}>{item.communityName}</Text>
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

export default OrganizationSwitcherModal;
