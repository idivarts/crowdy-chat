import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Chip, Modal, Portal, TextInput } from "react-native-paper";
import { styles } from "@/styles/Members";

interface MembersModalProps {
  visible: boolean;
  member: any[];
  handleModalClose: () => void;
  handleAddUser: (member: any) => void;
  editingIndex: number | null;
  updateMember: (member: any, index: number, userId: string) => void;
}
type PermissionKey = "read" | "write" | "admin";

const MembersModal: React.FC<MembersModalProps> = ({
  visible,
  member,
  handleModalClose,
  handleAddUser,
  editingIndex,
  updateMember,
}) => {
  const [newMember, setNewMember] = React.useState({
    username: "",
    name: "",
    email: "",
    password: "",
    permissions: {
      read: false,
      write: false,
      admin: false,
    },
  });

  const [userId, setUserId] = React.useState("");

  const handleInputChange = (key: string, value: string) => {
    setNewMember((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  React.useEffect(() => {
    if (editingIndex !== null) {
      //   setNewMember(member[editingIndex]);
      setNewMember({
        username: member[editingIndex].username,
        name: member[editingIndex].name,
        email: member[editingIndex].email,
        password: member[editingIndex].password,
        permissions: {
          read: member[editingIndex].permissions.read,
          write: member[editingIndex].permissions.write,
          admin: member[editingIndex].permissions.admin,
        },
      });
      setUserId(member[editingIndex].userId);
    }
  }, [editingIndex]);

  const handlePermissionsChange = (key: PermissionKey) => {
    setNewMember((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key],
      },
    }));
  };

  if (visible) {
    return (
      <Modal
        visible={visible}
        onDismiss={() => {
          handleModalClose();
          setNewMember({
            username: "",
            name: "",
            email: "",
            password: "",
            permissions: {
              read: false,
              write: false,
              admin: false,
            },
          });
        }}
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
            />
            <TextInput
              label="Name"
              mode="outlined"
              value={newMember.name}
              onChangeText={(value) => handleInputChange("name", value)}
              style={styles.input}
            />
            <TextInput
              label="Email"
              mode="outlined"
              value={newMember.email}
              onChangeText={(value) => handleInputChange("email", value)}
              style={styles.input}
            />
            {editingIndex === null && (
              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                value={newMember.password}
                onChangeText={(value) => handleInputChange("password", value)}
                style={styles.input}
              />
            )}

            <View style={styles.chipContainer}>
              <Chip
                selected={newMember.permissions.read}
                onPress={() => handlePermissionsChange("read")}
                style={styles.chip}
              >
                Read
              </Chip>
              <Chip
                selected={newMember.permissions.write}
                onPress={() => handlePermissionsChange("write")}
                style={styles.chip}
              >
                Write
              </Chip>
              <Chip
                selected={newMember.permissions.admin}
                onPress={() => handlePermissionsChange("admin")}
                style={styles.chip}
              >
                Admin
              </Chip>
            </View>
            <Button
              mode="contained"
              onPress={() => {
                if (editingIndex !== null) {
                  updateMember(newMember, editingIndex, userId);
                  setNewMember({
                    username: "",
                    name: "",
                    email: "",
                    password: "",
                    permissions: {
                      read: false,
                      write: false,
                      admin: false,
                    },
                  });
                } else {
                  console.log("From Modal", newMember);
                  handleAddUser(newMember);
                  setNewMember({
                    username: "",
                    name: "",
                    email: "",
                    password: "",
                    permissions: {
                      read: false,
                      write: false,
                      admin: false,
                    },
                  });
                }
              }}
              style={styles.addButton}
            >
              {editingIndex !== null ? "Update User" : "Add User"}
            </Button>
          </View>
        </View>
      </Modal>
    );
  }

  return null;
};

export default MembersModal;
