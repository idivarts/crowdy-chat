import React, { useState } from "react";
import {
  Appbar,
  Button,
  TextInput,
  DataTable,
  Modal,
  Portal,
  Provider,
  Chip,
  DefaultTheme,
} from "react-native-paper";
import { View, ScrollView } from "react-native";
import Dropdown from "@/shared-uis/components/dropdown/Dropdown";
import DropdownTrigger from "@/shared-uis/components/dropdown/DropdownTrigger";
import DropdownOptions from "@/shared-uis/components/dropdown/DropdownOptions";
import DropdownOption from "@/shared-uis/components/dropdown/DropdownOption";
import DropdownButton from "@/shared-uis/components/dropdown/DropdownButton";
import { MaterialIcons } from "@expo/vector-icons";
import { z, ZodError } from "zod";
import { styles } from "@/styles/Members";
import { MemberSchema } from "@/components/schemas/MemberPageSchema";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1976d2",
    background: "#ffffff",
    text: "#000000",
    surface: "#ffffff",
    onSurface: "#1976d2",
  },
};

type Member = z.infer<typeof MemberSchema>;

const MemberPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { lg } = useBreakPoints();
  const [newMember, setNewMember] = useState<Member>({
    username: "",
    name: "",
    password: "",
    permissions: ["Read"],
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key in keyof Member]?: string }>({});

  const permissionsOptions = ["Read", "Write", "Execute"]; // Example permissions

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleAddMemberClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewMember({
      username: "",
      name: "",
      password: "",
      permissions: ["Read"],
    });
    setEditingIndex(null);
    setErrors({});
  };

  const handleInputChange = (name: keyof Member, value: string) => {
    setNewMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handlePermissionsChange = (permission: string) => {
    setNewMember((prevMember) => {
      let newPermissions;
      if (prevMember.permissions.includes(permission)) {
        newPermissions = prevMember.permissions.filter(
          (perm) => perm !== permission
        );
        if (newPermissions.length === 0) {
          newPermissions.push(permission);
        }
      } else {
        newPermissions = [...prevMember.permissions, permission];
      }

      return {
        ...prevMember,
        permissions: newPermissions as [string, ...string[]],
      };
    });
  };

  const handleAddUser = () => {
    const result = MemberSchema.safeParse(newMember);

    if (result.success) {
      if (editingIndex !== null) {
        const updatedMembers = members.map((member, index) =>
          index === editingIndex ? newMember : member
        );
        setMembers(updatedMembers);
      } else {
        setMembers([...members, newMember]);
      }
      handleModalClose();
    } else {
      const error = result.error as ZodError;
      const formattedErrors: { [key in keyof Member]?: string } = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          const key = err.path[0] as keyof Member;
          formattedErrors[key] = err.message;
        }
      });
      setErrors(formattedErrors);
      Toaster.error(error.errors[0].message);
    }
  };

  const handleEditMember = (index: number) => {
    setEditingIndex(index);
    setNewMember(members[index]);
    setIsModalOpen(true);
  };

  const handleDeleteMember = (index: number) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const renderMember = (member: Member, index: number) => (
    <DataTable.Row
      key={index}
      style={{
        backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
        zIndex: -10 - index,
      }}
    >
      <DataTable.Cell>{member.name}</DataTable.Cell>
      <DataTable.Cell>{member.username}</DataTable.Cell>
      <DataTable.Cell>{member.permissions.join(", ")}</DataTable.Cell>
      <DataTable.Cell style={styles.actionsCell}>
        <Dropdown>
          <DropdownTrigger>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </DropdownTrigger>
          <DropdownOptions
            position={{
              top: "100%",
              right: 0,
            }}
          >
            <DropdownOption>
              <DropdownButton
                onPress={() => handleEditMember(index)}
                title="Edit"
              />
            </DropdownOption>
            <DropdownOption>
              <DropdownButton
                onPress={() => handleDeleteMember(index)}
                title="Delete"
              />
            </DropdownOption>
          </DropdownOptions>
        </Dropdown>
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <Provider theme={customTheme}>
      <Appbar.Header>
        {!lg && <DrawerToggle />}
        <Appbar.Content title="Members" />
        <Appbar.Action icon="plus" onPress={handleAddMemberClick} />
      </Appbar.Header>

      <View style={styles.container}>
        <TextInput
          label="Search by name"
          mode="outlined"
          value={searchTerm}
          onChangeText={handleSearchChange}
          style={styles.searchInput}
        />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Username</DataTable.Title>
            <DataTable.Title>Permissions</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>

          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            style={styles.scrollView}
          >
            {members
              .filter((member) =>
                member.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((member, index) => renderMember(member, index))}
          </ScrollView>
        </DataTable>
      </View>

      <Portal>
        <Modal
          visible={isModalOpen}
          onDismiss={handleModalClose}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalInputContainer}>
              <TextInput
                label="Username"
                mode="outlined"
                value={newMember.username}
                onChangeText={(value) => handleInputChange("username", value)}
                style={styles.input}
                error={!!errors.username}
              />
              <TextInput
                label="Name"
                mode="outlined"
                value={newMember.name}
                onChangeText={(value) => handleInputChange("name", value)}
                style={styles.input}
                error={!!errors.name}
              />
              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                value={newMember.password}
                onChangeText={(value) => handleInputChange("password", value)}
                style={styles.input}
                error={!!errors.password}
              />

              <View style={styles.chipContainer}>
                {permissionsOptions.map((option) => (
                  <Chip
                    key={option}
                    selected={newMember.permissions.includes(option)}
                    onPress={() => handlePermissionsChange(option)}
                    style={styles.chip}
                  >
                    {option}
                  </Chip>
                ))}
              </View>
              <Button
                mode="contained"
                onPress={handleAddUser}
                style={styles.addButton}
              >
                {editingIndex !== null ? "Update User" : "Add User"}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default MemberPage;
