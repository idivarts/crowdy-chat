import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { Modal, Card, Avatar } from "react-native-paper";
import { styles } from "@/styles/organization-switcher/OrganizationSwitcherModal.styles";
import { IOrganizations } from "@/shared-libs/firestore/crowdy-chat/models/organizations";

interface OrganizationSwitcherModalProps {
  organizations: IOrganizations[];
  visible: boolean;
  onClose: () => void;
  onSwitch: (organizationId: string) => void;
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
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSwitch(item.id!)}>
                <View style={styles.organizationCard}>
                  <Avatar.Image source={{ uri: item.image }} />
                  <Text style={styles.organizationName}>
                    {item.name}
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
