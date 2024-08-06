import React, { useState } from "react";
import { Button } from "react-native";
import OrganizationSwitcherModal from "./OrganizationSwitcherModal";

interface OrganizationSwitcherProps {}

const OrganizationSwitcher: React.FC<OrganizationSwitcherProps> = () => {
  const [isOrganizationModalVisible, setOrganizationModalVisible] = useState(false);

  const organizations = [
    { id: 1, name: "Organization 1", image: "https://via.placeholder.com/40" },
    { id: 2, name: "Organization 2", image: "https://via.placeholder.com/40" },
    { id: 3, name: "Organization 3", image: "https://via.placeholder.com/40" },
  ];

  const handleSwitchOrganization = (id: number) => {
    console.log(`Switched to organization with id: ${id}`);
    setOrganizationModalVisible(false);
  };

  return (
    <>
      <Button
        title="Switch Organization"
        onPress={() => setOrganizationModalVisible(true)}
      />
      <OrganizationSwitcherModal
        organizations={organizations}
        visible={isOrganizationModalVisible}
        onClose={() => setOrganizationModalVisible(false)}
        onSwitch={handleSwitchOrganization}
      />
    </>
  );
};

export default OrganizationSwitcher;
