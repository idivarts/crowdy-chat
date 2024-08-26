import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import OrganizationSwitcherModal from "./OrganizationSwitcherModal";
import { Text } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Portal } from "react-native-paper";
import { useBreakPoints } from "@/hooks";
import { useOrganizationContext } from "@/contexts/organization-context.provider";

interface OrganizationSwitcherProps { }

const OrganizationSwitcher: React.FC<OrganizationSwitcherProps> = () => {
  const [isOrganizationModalVisible, setOrganizationModalVisible] =
    useState(false);
  const { lg } = useBreakPoints();
  const {
    currentOrganization,
    getOrganizations,
    isOrganizationsLoading,
    organizations,
    setCurrentOrganization,
  } = useOrganizationContext();

  useEffect(() => {
    getOrganizations();
  }, []);

  const handleSwitchOrganization = (id: string) => {
    const currentOrg = organizations.find((org) => org.id === id);
    if (!currentOrg) {
      return;
    }
    setCurrentOrganization(currentOrg);
    setOrganizationModalVisible(false);
  };

  if (!currentOrganization) {
    return null;
  }

  if (isOrganizationsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Pressable
        onPress={() => setOrganizationModalVisible(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: lg ? 14 : 8,
        }}
      >
        <Text
          style={{
            fontSize: lg ? 24 : 16,
            fontWeight: "600",
          }}
        >
          {currentOrganization.name} - Users
        </Text>
        {isOrganizationModalVisible ? (
          <Ionicons
            name="chevron-up"
            size={lg ? 24 : 16}
            color="black"
            style={{
              marginTop: 6,
            }}
          />
        ) : (
          <Ionicons
            name="chevron-down"
            size={lg ? 24 : 16}
            color="black"
            style={{
              marginTop: 6,
            }}
          />
        )}
      </Pressable>
      <Portal>
        <OrganizationSwitcherModal
          organizations={organizations}
          visible={isOrganizationModalVisible}
          onClose={() => setOrganizationModalVisible(false)}
          onSwitch={handleSwitchOrganization}
        />
      </Portal>
    </>
  );
};

export default OrganizationSwitcher;
