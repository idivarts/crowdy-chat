import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Divider, Menu, IconButton } from "react-native-paper";
import { IConversationUnit } from "@/types/CampaignsBoard";
import { ConversationService } from "@/services";
import { stylesFn } from "@/styles/campaigns/campaign-open-view/ListView.styles";
import RenderTable from "./RenderListTable";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "../Themed";

type ChatBoard = {
  id: number;
  title: string;
  tasks: IConversationUnit[];
}[];

interface CampaignListViewProps {
  pageId: string | null;
  getAllConversations: () => any;
  conversations: IConversationUnit[];
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
  const [groupBy, setGroupBy] = useState<string | null>(null);
  const [groupBySource, setGroupBySource] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const { pageId } = props;

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
        const source = conversation.page.isInstagram ? "Instagram" : "Other";
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

  const PhaseMap = {
    0: 0,
    1: 0,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 1,
  };

  useEffect(() => {
    const cols: ChatBoard = [
      { id: 1, title: "Initial", tasks: [] },
      { id: 7, title: "Take Action", tasks: [] },
      { id: 2, title: "Data Collection", tasks: [] },
      { id: 3, title: "Beta Intro", tasks: [] },
      { id: 4, title: "Brands", tasks: [] },
      { id: 5, title: "Wait Stage", tasks: [] },
      { id: 6, title: "Uninterested", tasks: [] },
    ];
    for (let i = 0; i < allConversation.length; i++) {
      const ele = allConversation[i];
      //@ts-ignore
      let colInd = PhaseMap[ele.currentPhase];
      cols[colInd].tasks.push(ele);
    }
    setColumns(cols);
  }, [allConversation]);

  useEffect(() => {
    props.getAllConversations().then((res: any) => {
      setAllConversation(res);
    });
  }, []);

  useEffect(() => {
    setAllConversation(props.conversations);
  }, [props.conversations]);

  const handlePhaseChange = (igsid: string, newPhase: number) => {
    ConversationService.updateConversation(igsid, {
      currentPhase: newPhase,
      status: 0,
    });
    setAllConversation((allCs) => {
      for (let i = 0; i < allCs.length; i++) {
        const c = allCs[i];
        if (c.igsid == igsid) {
          c.currentPhase = newPhase;
          c.status = 0;
        }
      }
      return [...allCs];
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.groupByContainer}>
          <Text>Group by: </Text>
          <Menu
            visible={menuVisible}
            style={{
              backgroundColor: "#fff",
            }}
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
