import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { DataTable, Text, Menu, Button, IconButton } from "react-native-paper";
import TimeAgo from "timeago-react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/campaigns/campaign-open-view/ListView.styles";
import { IConversationUnit } from "@/types/CampaignsBoard";
import Colors from "@/constants/Colors";
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
}: {
  conversations: IConversationUnit[];
  title?: string;
  columns: ChatBoard;
  handlePhaseChange: (id: string, phase: number) => void;
}) => {
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
        }}
      >
        <Text>{title}</Text>
        {sortColumn === key && (
          <Ionicons
            name={sortOrder === "asc" ? "caret-up" : "caret-down"}
            size={16}
            color={Colors.regular.primary}
            style={styles.sortIcon}
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
          valueA = a.user.name;
          valueB = b.user.name;
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
        case "source":
          valueA = a.page.isInstagram ? "Instagram" : "Other";
          valueB = b.page.isInstagram ? "Instagram" : "Other";
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
      <ScrollView
        horizontal
        contentContainerStyle={{
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
                  }}
                >
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>
                      {conversation.user.name}
                    </Text>
                    <Text style={styles.userHandle}>
                      @{conversation.user.userName}
                    </Text>
                  </View>
                  <IconButton
                    icon="comment-plus"
                    iconColor="#e1e1e1"
                    size={20}
                    onPress={() => {}}
                  />
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                <Menu
                  visible={visibleMenu === conversation.igsid}
                  onDismiss={closeMenu}
                  style={{
                    backgroundColor: "#fff",
                  }}
                  anchor={
                    <Button onPress={() => openMenu(conversation.igsid)}>
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
                        handlePhaseChange(conversation.igsid, col.id);
                        closeMenu();
                      }}
                      title={col.title}
                    />
                  ))}
                </Menu>
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {conversation.lastBotMessageTime <= 0 ? (
                  <Text>No messages</Text>
                ) : (
                  <TimeAgo
                    datetime={conversation.lastBotMessageTime}
                    style={styles.timeAgo}
                  />
                )}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                <Text>{conversation.botMessageCount}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                <Text>
                  {conversation.page.isInstagram ? "Instagram" : "Other"}
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
    </View>
  );
};

export default RenderTable;
