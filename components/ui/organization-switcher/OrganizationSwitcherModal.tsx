import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Modal, Card, Avatar } from "react-native-paper";
import { stylesFn } from "@/styles/organization-switcher/OrganizationSwitcherModal.styles";
import { Organization } from "@/types/Organization";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import { imageUrl } from "@/helpers/imageurl";

interface OrganizationSwitcherModalProps {
  organizations: Organization[];
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
  const theme = useTheme();
  const styles = stylesFn(theme);

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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSwitch(item.id)}>
                <View style={styles.organizationCard}>
                  <Avatar.Image source={imageUrl(item.image)} />
                  <Text style={styles.organizationName}>{item.name}</Text>
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
