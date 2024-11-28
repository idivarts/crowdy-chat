import Colors from "@/constants/Colors";
import { useOrganizationContext } from "@/contexts";
import { Organization } from "@/types/Organization";
import { Octicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Pressable } from "react-native";
import { Menu } from "react-native-paper";

const OrganizationSwitcherMenu = () => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const { organizations, currentOrganization, changeOrganization } =
    useOrganizationContext();

  const openMenu = () => setVisible(true);

  const handleOrgChange = (org: Organization) => {
    changeOrganization(org);
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      anchorPosition="top"
      onDismiss={() => setVisible(false)}
      contentStyle={{
        paddingVertical: 0,
        borderRadius: 4,
        overflow: "hidden",
      }}
      anchor={
        <Pressable onPress={openMenu}>
          <Octicons
            name="arrow-switch"
            size={26}
            style={{
              marginLeft: 14,
              color: Colors(theme).text,
              marginBottom: -2,
            }}
          />
        </Pressable>
      }
    >
      {organizations.map((org: Organization) => (
        <Menu.Item
          key={org.id}
          style={{
            backgroundColor:
              org.id === currentOrganization?.id
                ? Colors(theme).primary
                : Colors(theme).background,
            margin: 0,
          }}
          titleStyle={{
            color:
              org.id === currentOrganization?.id
                ? Colors(theme).white
                : Colors(theme).text,
          }}
          onPress={() => handleOrgChange(org)}
          title={org.name}
        />
      ))}
    </Menu>
  );
};

export default OrganizationSwitcherMenu;
