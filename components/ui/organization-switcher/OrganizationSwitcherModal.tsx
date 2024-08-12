import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { Modal, Card, Avatar, IconButton } from "react-native-paper";
import { styles } from "@/styles/organization-switcher/OrganizationSwitcherModal.styles";

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
      onDismiss={onClose}
      contentContainerStyle={styles.modalContainer}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <FlatList
            data={organizations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSwitch(item.id)}>
                <View style={styles.organizationCard}>
                  <Avatar.Image source={{ uri: item.image }} />
                  <Text style={styles.organizationName}>
                    {item.communityName}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default OrganizationSwitcherModal;
