import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Divider, Menu, IconButton } from "react-native-paper";
import { IConversationUnit } from "@/types/CampaignsBoard";
import { ConversationService } from "@/services";
import { stylesFn } from "@/styles/campaigns/campaign-open-view/ListView.styles";
import RenderTable from "./RenderListTable";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "../Themed";
import { collection, getDocs } from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { useOrganizationContext } from "@/contexts";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";

type ChatBoard = {
  id: number;
  title: string;
  tasks: IConversationUnit[];
}[];

interface CampaignListViewProps {
  pageId: string | null;
  getAllConversations: () => any;
  conversations: IConversationUnit[];
  refreshKey: number;
}

const CampaignListView: React.FC<CampaignListViewProps> = (
  props: CampaignListViewProps
) => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [columns, setColumns] = useState<ChatBoard>([]);
  const [allConversation, setAllConversation] = useState<IConversationUnit[]>(
    []
  );
  const { currentOrganization } = useOrganizationContext();
  const [groupBy, setGroupBy] = useState<string | null>(null);
  const [groupBySource, setGroupBySource] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const { campaignId, pageID } = useLocalSearchParams();

  const fetchColumnsAndPhaseMap = async () => {
    if (!currentOrganization || !campaignId)
      return { fetchedColumns: [], phaseMap: {} };
    try {
      const leadStageRef = collection(
        FirestoreDB,
        "organizations",
        currentOrganization?.id,
        "campaigns",
        campaignId as string,
        "leadStages"
      );

      const data = await getDocs(leadStageRef);

      const phaseMap: Record<number, number> = {};
      const fetchedColumns = data.docs.map((doc) => {
        const columnData = doc.data();
        phaseMap[columnData.index] = columnData.index;

        return {
          id: columnData.index,
          title: columnData.name,
          tasks: [],
        };
      });

      return { fetchedColumns, phaseMap };
    } catch (error) {
      console.error("Error fetching columns:", error);
      return { fetchedColumns: [], phaseMap: {} };
    }
  };

  const setColumnsAll = async () => {
    const { fetchedColumns, phaseMap } = await fetchColumnsAndPhaseMap();

    const updatedColumns = fetchedColumns.map((column) => {
      const columnTasks = allConversation.filter(
        (conversation) => phaseMap[conversation.currentPhase] === column.id
      );
      return { ...column, tasks: columnTasks };
    });

    setColumns(updatedColumns);
  };

  useEffect(() => {
    props.getAllConversations().then((res: any) => {
      setAllConversation(res);
      setColumnsAll();
    });
  }, [props.refreshKey]);

  useEffect(() => {
    setAllConversation(props.conversations);
    setColumnsAll();
  }, [props.conversations]);

  const handlePhaseChange = async (igsid: string, newPhase: number) => {
    setAllConversation((allCs) => {
      const updatedConversations = allCs.map((conversation) =>
        conversation.id === igsid
          ? { ...conversation, currentPhase: newPhase, status: 0 }
          : conversation
      );
      setColumnsAll();
      return updatedConversations;
    });

    const user = await AuthApp.currentUser?.getIdToken();

    await ConversationService.updateConversation(
      campaignId as string,
      igsid,
      currentOrganization?.id as string,
      newPhase,
      undefined,
      user as string
    );
  };

  const groupedTables = () => {
    if (groupBy === "phase") {
      return columns.map((column) => (
        <View key={column.id} style={{ backgroundColor: "#fff" }}>
          <RenderTable
            conversations={column.tasks}
            title={column.title}
            columns={columns}
            handlePhaseChange={handlePhaseChange}
          />
          <Divider style={styles.divider} />
        </View>
      ));
    }

    if (groupBySource === "source") {
      const groupedBySource = allConversation.reduce((acc, conversation) => {
        const source = conversation.sourceId ? "Instagram" : "Other";
        if (!acc[source]) acc[source] = [];
        acc[source].push(conversation);
        return acc;
      }, {} as Record<string, IConversationUnit[]>);

      return Object.keys(groupedBySource).map((source) => (
        <View key={source} style={{ backgroundColor: "#fff" }}>
          <RenderTable
            conversations={groupedBySource[source]}
            title={source}
            columns={columns}
            handlePhaseChange={handlePhaseChange}
          />
          <Divider style={styles.divider} />
        </View>
      ));
    }

    return (
      <RenderTable
        conversations={allConversation}
        columns={columns}
        handlePhaseChange={handlePhaseChange}
        title="All Conversations"
        key={"all"}
      />
    );
  };

  if (!pageID) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors(theme).background,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: Colors(theme).text,
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          Please select a source to view conversations.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.groupByContainer}>
          <Text>Group by: </Text>
          <Menu
            visible={menuVisible}
            style={{ backgroundColor: "#fff" }}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="chevron-down"
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                setGroupBy(groupBy === "phase" ? null : "phase");
                setGroupBySource(null);
                setMenuVisible(false);
              }}
              title={groupBy === "phase" ? "Ungroup Phase" : "Phase"}
            />
            <Menu.Item
              onPress={() => {
                setGroupBySource(groupBySource === "source" ? null : "source");
                setGroupBy(null);
                setMenuVisible(false);
              }}
              title={groupBySource === "source" ? "Ungroup Source" : "Source"}
            />
          </Menu>
        </View>

        {groupedTables()}
      </View>
    </ScrollView>
  );
};

export default CampaignListView;
