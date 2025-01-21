import React, { useEffect, useState } from "react";
import {
  DataTable,
  Portal,
  Chip,
  Text,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import { Pressable, ScrollView } from "react-native";
import Dropdown from "@/shared-uis/components/dropdown/Dropdown";
import DropdownTrigger from "@/shared-uis/components/dropdown/DropdownTrigger";
import DropdownOptions from "@/shared-uis/components/dropdown/DropdownOptions";
import DropdownOption from "@/shared-uis/components/dropdown/DropdownOption";
import DropdownButton from "@/shared-uis/components/dropdown/DropdownButton";
import { MaterialIcons } from "@expo/vector-icons";
import { ZodError } from "zod";
import { stylesFn } from "@/styles/Members";
import { useOrganizationContext } from "@/contexts/organization-context.provider";
import { MemberSchema } from "@/components/schemas/MemberPageSchema";
import Toaster from "@/shared-uis/components/toaster/Toaster";
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
import { DrawerActions, useTheme } from "@react-navigation/native";
import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import AppLayout from "@/layouts/app-layout";
import ProfileCircle from "@/components/profile/ProfileCircle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import ScreenHeader from "@/components/screen-header";
import { useNavigation } from "expo-router";
import TextInput from "@/components/ui/text-input/TextInput";

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
  const { xl } = useBreakPoints();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fetchMembers = async () => {
    try {
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
            await setDoc(
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

            await setDoc(
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

            await setDoc(
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
      <View
        key={index}
        style={{
          backgroundColor: Colors(theme).background,
          zIndex: -10 - index,
          paddingHorizontal: 0,
          flexDirection: "row",
          marginVertical: 16,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <View
          style={{
            minWidth: 20,
            height: 25,
          }}
        >
          <Text>{member.name || "No Name"}</Text>
        </View>
        <View
          style={{
            minWidth: 20,
            height: 25,
          }}
        >
          <Text>{member.email}</Text>
        </View>

        <View
          style={{
            minWidth: 25,
            height: 25,
            flex: 1,
          }}
        >
          <View
            style={[
              styles.chipContainer,
              { backgroundColor: Colors(theme).background },
            ]}
          >
            {member.permissions.read && <Text style={styles.chip}>Read</Text>}
            {member.permissions.write && <Chip style={styles.chip}>Write</Chip>}
            {member.permissions.admin && <Text style={styles.chip}>Admin</Text>}
          </View>
        </View>
        <DataTable.Cell style={styles.actionsCell}>
          <Dropdown>
            <DropdownTrigger>
              <MaterialIcons
                name="more-vert"
                size={24}
                color={Colors(theme).primary}
              />
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
      </View>
    );
  };

  const filteredMembers = members.filter((member) => {
    if (!searchTerm) return true;
    return (
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    );
  });
  const navigation = useNavigation();

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
    <AppLayout>
      <ScreenHeader
        title="Members"
        rightAction
        leftIcon={!xl ? faBars : null}
        rightActionButton={<ProfileCircle />}
        action={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          gap: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <TextInput
            containerStyle={{
              flex: 1,
            }}
            label="Search by name"
            mode="outlined"
            value={searchTerm}
            onChangeText={handleSearchChange}
            style={styles.searchInput}
          />
          <IconButton
            icon={() =>
              <FontAwesomeIcon
                icon={faPlus}
                size={20}
                color={Colors(theme).primary}
              />
            }
            size={20}
            onPress={handleAddMemberClick}
          />
        </View>
        <DataTable>
          <DataTable.Header
            style={{
              paddingHorizontal: 0,
            }}
          >
            <DataTable.Title
              style={{
                paddingVertical: 0,
              }}
            >
              Name
            </DataTable.Title>
            <DataTable.Title
              style={{
                paddingVertical: 0,
              }}
            >
              Email
            </DataTable.Title>
            <DataTable.Title
              style={{
                paddingVertical: 0,
              }}
            >
              Permissions
            </DataTable.Title>
            <DataTable.Title
              style={{
                paddingVertical: 0,
              }}
              numeric
            >
              Actions
            </DataTable.Title>
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
          theme={theme}
        />
      </Portal>
    </AppLayout>
  );
};

export default MemberPage;
