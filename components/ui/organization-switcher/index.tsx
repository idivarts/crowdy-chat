import React, { useState } from "react";
import { Pressable } from "react-native";
import OrganizationSwitcherModal from "./OrganizationSwitcherModal";
import { Text } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Portal } from "react-native-paper";
import { useBreakPoints } from "@/hooks";

interface OrganizationSwitcherProps { }

const OrganizationSwitcher: React.FC<OrganizationSwitcherProps> = () => {
  const [isOrganizationModalVisible, setOrganizationModalVisible] =
    useState(false);
  const { lg } = useBreakPoints();
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
          gap: lg ? 14 : 8,
        }}
      >
        <Text
          style={{
            fontSize: lg ? 24 : 16,
            fontWeight: "600",
          }}
        >
          {currentOrganization.communityName} - Users
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
