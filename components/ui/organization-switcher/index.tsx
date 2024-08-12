import React, { useState } from "react";
import { Pressable } from "react-native";
import OrganizationSwitcherModal from "./OrganizationSwitcherModal";
import { Text } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Portal } from "react-native-paper";

interface OrganizationSwitcherProps {}

const OrganizationSwitcher: React.FC<OrganizationSwitcherProps> = () => {
  const [isOrganizationModalVisible, setOrganizationModalVisible] =
    useState(false);
  const organizations = [
    {
      id: 1,
      communityName: "Trendly.pro",
      image: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      communityName: "Organization 1",
      image: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      communityName: "Organization 2",
      image: "https://via.placeholder.com/40",
    },
  ];

  const [currentOrganization] = useState(organizations[0]);

  const handleSwitchOrganization = (id: number) => {
    console.log(`Switched to organization with id: ${id}`);
    setOrganizationModalVisible(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setOrganizationModalVisible(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
          }}
        >
          {currentOrganization.communityName} - Users
        </Text>
        {isOrganizationModalVisible ? (
          <Ionicons
            name="chevron-up"
            size={24}
            color="black"
            style={{
              marginTop: 6,
            }}
          />
        ) : (
          <Ionicons
            name="chevron-down"
            size={24}
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
