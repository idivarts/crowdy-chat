import React, { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { DataTable, Menu, IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { stylesFn } from "@/styles/campaigns/campaign-open-view/ListView.styles";
import { IConversationUnit } from "@/types/CampaignsBoard";
import Colors from "@/constants/Colors";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "../Themed";
import Button from "../ui/button/Button";

type ChatBoard = {
  id: number;
  title: string;
  tasks: IConversationUnit[];
}[];
const RenderTable = ({
  conversations,
  title,
  columns,
  handlePhaseChange,
  setCurrentConversation,
}: {
  conversations: IConversationUnit[];
  title?: string;
  columns: ChatBoard;
  setCurrentConversation: (conversation: IConversationUnit) => void;
  handlePhaseChange: (id: string, phase: number) => void;
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const openMenu = (id: string) => {
    setVisibleMenu(id); // Open the clicked menu and close others
  };

  const closeMenu = () => {
    setVisibleMenu(null); // Close the menu
  };

  const renderHeader = (title: string, key: string) => (
    <DataTable.Title style={styles.headerCell} onPress={() => handleSort(key)}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          display: "flex",
          gap: 10,
          borderBottomWidth: 0,
        }}
      >
        <Text>{title}</Text>
        {sortColumn === key && (
          <Ionicons
            name={sortOrder === "asc" ? "caret-up" : "caret-down"}
            size={16}
            color={Colors(theme).primary}
          />
        )}
      </View>
    </DataTable.Title>
  );

  const handleSort = (key: string) => {
    let order: "asc" | "desc" = "asc";
    if (sortColumn === key && sortOrder === "asc") {
      order = "desc";
    }
    setSortColumn(key);
    setSortOrder(order);
  };

  const sortConversations = (conversations: IConversationUnit[]) => {
    if (!sortColumn || !sortOrder) return conversations;

    return [...conversations].sort((a, b) => {
      let valueA, valueB;

      switch (sortColumn) {
        case "user":
          valueA = a.user.userProfile?.name || "";
          valueB = b.user.userProfile?.name || "";
          break;
        case "phase":
          valueA = a.currentPhase;
          valueB = b.currentPhase;
          break;
        case "lastMessage":
          valueA = new Date(a.lastBotMessageTime).getTime();
          valueB = new Date(b.lastBotMessageTime).getTime();
          break;
        case "botCount":
          valueA = a.botMessageCount;
          valueB = b.botMessageCount;
          break;
          // case "source":
          //   valueA = a.page.isInstagram ? "Instagram" : "Other";
          //   valueB = b.page.isInstagram ? "Instagram" : "Other";
          break;
        default:
          return 0;
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <View style={styles.tableContainer}>
      {title && <Text style={styles.groupTitle}>{title}</Text>}
      {Platform.OS === "web" ? (
        <ScrollView
          horizontal
          contentContainerStyle={{
            width: "100%",
          }}
        >
          <DataTable>
            <DataTable.Header
              style={{
                borderBottomWidth: 0,
              }}
            >
              {renderHeader("User", "user")}
              {renderHeader("Phase", "phase")}
              {renderHeader("Last Message", "lastMessage")}
              {renderHeader("Bot Count", "botCount")}
              {renderHeader("Source", "source")}
              {renderHeader("Notes", "notes")}
            </DataTable.Header>

            {sortConversations(conversations).map((conversation, index) => (
              <DataTable.Row key={index} style={styles.row}>
                <DataTable.Cell style={styles.cell}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>
                        {conversation.user.userProfile?.name}
                      </Text>
                      <Text style={styles.userHandle}>
                        @{conversation.user.userProfile?.username}
                      </Text>
                    </View>
                    <IconButton
                      icon="comment-plus"
                      iconColor="#e1e1e1"
                      size={20}
                      onPress={() => {
                        setCurrentConversation(conversation);
                      }}
                    />
                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Menu
                    visible={visibleMenu === conversation.id}
                    onDismiss={closeMenu}
                    style={{
                      backgroundColor: Colors(theme).background,
                    }}
                    anchor={
                      <Button onPress={() => openMenu(conversation.id)}>
                        {columns.find(
                          (col) => col.id === conversation.currentPhase
                        )?.title || "Select"}
                      </Button>
                    }
                  >
                    {columns.map((col) => (
                      <Menu.Item
                        key={col.id}
                        onPress={() => {
                          handlePhaseChange(conversation.id, col.id);
                          closeMenu();
                        }}
                        title={col.title}
                        style={{ backgroundColor: Colors(theme).background }}
                        titleStyle={{ color: Colors(theme).text }}
                      />
                    ))}
                  </Menu>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  {conversation.lastBotMessageTime <= 0 ? (
                    <Text>No messages</Text>
                  ) : (
                    <Text>
                      {formatDistanceToNow(
                        new Date(conversation.lastBotMessageTime)
                      )}
                    </Text>
                  )}
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Text>{conversation.botMessageCount}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Text>
                    {/* {conversation.page.isInstagram ? "Instagram" : "Other"} */}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Text>Notes...</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
            <DataTable.Row
              style={{
                borderBottomWidth: 0,
              }}
            >
              <DataTable.Cell style={styles.cell}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton icon="plus" onPress={() => {}} />
                  <Text>Add New</Text>
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexGrow: 1, // Allow horizontal scrolling
            alignItems: "stretch", // Stretch child views
          }}
          style={{
            width: "100%",
          }}
        >
          <DataTable>
            <DataTable.Header>
              {renderHeader("User", "user")}
              {renderHeader("Phase", "phase")}
              {renderHeader("Last Message", "lastMessage")}
              {renderHeader("Bot Count", "botCount")}
              {renderHeader("Source", "source")}
              {renderHeader("Notes", "notes")}
            </DataTable.Header>

            {sortConversations(conversations).map((conversation, index) => (
              <DataTable.Row key={index} style={styles.row}>
                <DataTable.Cell style={styles.cell}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                      borderBottomWidth: 0,
                    }}
                  >
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>
                        {conversation.user.userProfile?.name}
                      </Text>
                      <Text style={styles.userHandle}>
                        @{conversation.user.userProfile?.username}
                      </Text>
                    </View>
                    <IconButton
                      icon="comment-plus"
                      iconColor="#e1e1e1"
                      size={20}
                      onPress={() => {
                        setCurrentConversation(conversation);
                      }}
                    />
                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Menu
                    visible={visibleMenu === conversation.id}
                    onDismiss={closeMenu}
                    style={{
                      backgroundColor: "#fff",
                    }}
                    anchor={
                      <Button onPress={() => openMenu(conversation.id)}>
                        {columns.find(
                          (col) => col.id === conversation.currentPhase
                        )?.title || "Select"}
                      </Button>
                    }
                  >
                    {columns.map((col) => (
                      <Menu.Item
                        key={col.id}
                        onPress={() => {
                          handlePhaseChange(conversation.id, col.id);
                          closeMenu();
                        }}
                        title={col.title}
                        style={{ backgroundColor: Colors(theme).background }}
                        titleStyle={{ color: Colors(theme).text }}
                      />
                    ))}
                  </Menu>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  {conversation.lastBotMessageTime <= 0 ? (
                    <Text>No messages</Text>
                  ) : (
                    <Text>
                      {formatDistanceToNow(
                        new Date(conversation.lastBotMessageTime)
                      )}
                    </Text>
                  )}
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Text>{conversation.botMessageCount}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Text>
                    {/* {conversation.page.isInstagram ? "Instagram" : "Other"} */}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Text>Notes...</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
            <DataTable.Row>
              <DataTable.Cell style={styles.cell}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton icon="plus" onPress={() => {}} />
                  <Text>Add New</Text>
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      )}
    </View>
  );
};

export default RenderTable;
