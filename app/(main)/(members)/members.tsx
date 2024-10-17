import React, { useEffect, useState } from "react";
import {
  Appbar,
  TextInput,
  DataTable,
  Portal,
  Provider,
  Chip,
  DefaultTheme,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { View, ScrollView } from "react-native";
import Dropdown from "@/shared-uis/components/dropdown/Dropdown";
import DropdownTrigger from "@/shared-uis/components/dropdown/DropdownTrigger";
import DropdownOptions from "@/shared-uis/components/dropdown/DropdownOptions";
import DropdownOption from "@/shared-uis/components/dropdown/DropdownOption";
import DropdownButton from "@/shared-uis/components/dropdown/DropdownButton";
import { MaterialIcons } from "@expo/vector-icons";
import { z, ZodError } from "zod";
import { stylesFn } from "@/styles/Members";
import { useOrganizationContext } from "@/contexts/organization-context.provider";
import { MemberSchema } from "@/components/schemas/MemberPageSchema";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { DrawerToggle } from "@/components/ui";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { useBreakPoints } from "@/hooks";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { IMembers } from "@/shared-libs/firestore/crowdy-chat/models/members";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { IUser } from "@/shared-libs/firestore/crowdy-chat/models/users";
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import MembersModal from "@/components/modals/Members/MembersModal";
import { useTheme } from "@react-navigation/native";

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

interface MemberDetails {
  userId?: string;
  organizationId?: string;
  name: string;
  password: string;
  permissions: {
    read: boolean;
    write: boolean;
    admin: boolean;
  };
  email: string;
}

const MemberPage: React.FC = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [members, setMembers] = useState<MemberDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { currentOrganization } = useOrganizationContext();
  const { lg } = useBreakPoints();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fetchMembers = async () => {
    try {
      let authUser = AuthApp.currentUser;

      // Correctly reference the collection
      let memberColRef = collection(
        FirestoreDB,
        "organizations",
        // @ts-ignore
        currentOrganization.id,
        "members"
      );

      // Fetch all documents in the collection
      const membersSnapshot = await getDocs(memberColRef);

      const membersData = membersSnapshot.docs.map((doc) => doc.data());

      const userColRef = collection(FirestoreDB, "users");

      const memberData = await Promise.all(
        membersData.map(async (member: any) => {
          const userDocRef = doc(userColRef, member.userId);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data() as IUser;
          return {
            ...member,
            name: userData.name,
            email: userData.email,
            userId: userDoc.id,
          };
        })
      );

      setMembers(memberData);
    } catch (e) {
      Toaster.error("Failed to fetch members");
      console.error(e);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleAddMemberClick = () => {
    setIsModalOpen(true);
  };

  const updateMember = async (
    member: IMembers,
    index: number,
    userId: string
  ) => {
    try {
      if (!currentOrganization?.id) {
        throw new Error("Organization not found.");
      }

      const memberColRef = collection(
        FirestoreDB,
        "organizations",
        currentOrganization.id,
        "members"
      );

      const memberDocRef = doc(memberColRef, userId);
      const memberSnapshot = await getDoc(memberDocRef);

      if (!memberSnapshot.exists()) {
        Toaster.error("Member not found");
        return;
      }

      const memberData = {
        userId: userId,
        organizationId: currentOrganization.id,
        permissions: {
          read: member.permissions.read,
          write: member.permissions.write,
          admin: member.permissions.admin,
        },
      };

      await updateDoc(memberDocRef, memberData);

      await fetchMembers();

      setIsModalOpen(false);

      setEditingIndex(null);

      Toaster.success("Member updated successfully");
    } catch (e) {
      Toaster.error("Failed to update member");
      console.error(e);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleAddUser = async (newMember: {
    name: string;
    password: string;
    permissions: {
      read: boolean;
      write: boolean;
      admin: boolean;
    };
    email: string;
  }) => {
    const result = MemberSchema.safeParse(newMember);
    if (!currentOrganization) {
      throw new Error("Organization not found");
    }

    if (result.success) {
      if (editingIndex !== null) {
        const updatedMembers = members.map((member, index) =>
          index === editingIndex ? newMember : member
        );
        setMembers(updatedMembers);
      } else {
        try {
          let memberColRef = collection(
            FirestoreDB,
            "organizations",
            currentOrganization.id,
            "members"
          );

          let userColRef = collection(FirestoreDB, "users");

          const userQuery = query(
            userColRef,
            where("email", "==", newMember.email)
          );
          const userSnapshot = await getDocs(userQuery);

          if (userSnapshot.empty) {
            const user = await createUserWithEmailAndPassword(
              AuthApp,
              newMember.email,
              newMember.password
            );
            await sendEmailVerification(user.user);
            const userColRef = collection(FirestoreDB, "users");
            const newUser: IUser = {
              email: newMember.email,
              name: newMember.name,
            };
            const docUserRef = await setDoc(
              doc(userColRef, user.user.uid),
              newUser
            );

            let memberData: IMembers = {
              userId: user.user.uid,
              organizationId: currentOrganization?.id,
              permissions: {
                read: newMember.permissions.read,
                write: newMember.permissions.write,
                admin: newMember.permissions.admin,
              },
            };

            const docRef = await setDoc(
              doc(memberColRef, user.user.uid),
              memberData
            );

            Toaster.success("Member added successfully");
            return;
          } else {
            const userDoc = userSnapshot.docs[0];
            let memberData: IMembers = {
              userId: userDoc.id,
              organizationId: currentOrganization?.id,
              permissions: {
                read: newMember.permissions.read,
                write: newMember.permissions.write,
                admin: newMember.permissions.admin,
              },
            };

            const docRef = await setDoc(
              doc(memberColRef, userDoc.id),
              memberData
            );
          }
        } catch (e) {
          Toaster.error("Failed to add member");
          console.error(e);
        }
        setMembers([...members, newMember]);
      }
      await fetchMembers();
      handleModalClose();
    } else {
      const error = result.error as ZodError;
      Toaster.error(error.errors[0].message);
    }
  };

  const handleEditMember = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteMember = async (index: number) => {
    try {
      const organizationColRef = collection(FirestoreDB, "organizations");
      const organizationDocRef = doc(
        organizationColRef,
        currentOrganization?.id
      );

      if (!currentOrganization?.id) {
        Toaster.error("Organization not found");
        return;
      }

      const memberColRef = collection(
        FirestoreDB,
        "organizations",
        currentOrganization?.id,
        "members"
      );

      const memberDocRef = doc(memberColRef, members[index].userId);

      await deleteDoc(memberDocRef).then(() => {
        Toaster.success("Member deleted successfully");
      });

      const updatedMembers = members.filter((_, i) => i !== index);
      setMembers(updatedMembers);
    } catch (e) {
      console.log(e);
    }
  };

  const renderMember = (
    member: {
      name: string;
      email: string;
      permissions: {
        read: boolean;
        write: boolean;
        admin: boolean;
      };
    },
    index: number
  ) => {
    const authUser = AuthApp.currentUser;
    return (
      <DataTable.Row
        key={index}
        style={{
          backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
          zIndex: -10 - index,
        }}
      >
        <DataTable.Cell>{member.name || "No Name"}</DataTable.Cell>
        <DataTable.Cell>{member.email}</DataTable.Cell>
        <DataTable.Cell>
          <View style={styles.chipContainer}>
            {member.permissions.read && <Chip style={styles.chip}>Read</Chip>}
            {member.permissions.write && <Chip style={styles.chip}>Write</Chip>}
            {member.permissions.admin && <Chip style={styles.chip}>Admin</Chip>}
          </View>
        </DataTable.Cell>
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
                {authUser?.email !== member.email && (
                  <DropdownButton
                    onPress={() => handleDeleteMember(index)}
                    title="Delete"
                  />
                )}
              </DropdownOption>
            </DropdownOptions>
          </Dropdown>
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  const filteredMembers = members.filter((member) => {
    if (!searchTerm) return true;
    return (
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    );
  });

  useEffect(() => {
    if (currentOrganization) {
      fetchMembers();
    }
  }, [currentOrganization]);

  if (!currentOrganization) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Provider theme={customTheme}>
      <Appbar.Header statusBarHeight={0}>
        {!lg && <DrawerToggle />}
        <Appbar.Content title="Members" />
        <Appbar.Action icon="plus" onPress={handleAddMemberClick} />
      </Appbar.Header>

      <ScrollView style={styles.container}>
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
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title>Permissions</DataTable.Title>
            <DataTable.Title numeric>Actions</DataTable.Title>
          </DataTable.Header>
          {filteredMembers.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No members found</Text>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              style={styles.scrollView}
            >
              {filteredMembers.map(renderMember)}
            </ScrollView>
          )}
        </DataTable>
      </ScrollView>
      <Portal>
        <MembersModal
          visible={isModalOpen}
          handleModalClose={handleModalClose}
          handleAddUser={handleAddUser}
          editingIndex={editingIndex}
          updateMember={updateMember}
          member={members}
        />
      </Portal>
    </Provider>
  );
};

export default MemberPage;
