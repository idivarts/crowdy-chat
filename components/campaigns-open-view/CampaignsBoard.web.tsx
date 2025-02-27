import Colors from "@/constants/Colors";
import { useOrganizationContext } from "@/contexts";
import { ConversationService } from "@/services";
import {
  CampaignsBoardColumn,
  IConversationUnit,
} from "@/types/CampaignsBoard";
import { AuthApp } from "@/utils/auth";
import { FirestoreDB } from "@/utils/firestore";
import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ActivityIndicator } from "react-native";
import EmptyState from "../EmptyState";
import { View } from "../Themed";
import ChatModal from "./ChatModal";
import ConversationCard from "./ConversationCard";

interface CampaignsBoardWebProps {
  getAllConversations: () => any;
  conversations: IConversationUnit[];
  refreshKey: number;
}

const CampaignsBoardWeb: React.FC<CampaignsBoardWebProps> = (
  props: CampaignsBoardWebProps
) => {
  const theme = useTheme();
  const [allConversation, setAllConversation] = useState<IConversationUnit[]>(
    []
  );
  const [currentConversation, setCurrentConversation] = useState<
    IConversationUnit | undefined
  >();
  const [columns, setColumns] = useState<CampaignsBoardColumn>([]);
  const { pageID, campaignId } = useLocalSearchParams();
  const { currentOrganization } = useOrganizationContext();
  const [loading, setLoading] = useState<boolean>(true);

  const changePhase = async (igsid: string, newPhase: number) => {
    const user = await AuthApp.currentUser?.getIdToken();
    setAllConversation((prevConversations) => {
      const updatedConversations = prevConversations.map((conversation) =>
        conversation.id === igsid
          ? { ...conversation, currentPhase: newPhase, status: 0 }
          : conversation
      );
      setColumnsAll(updatedConversations);
      return updatedConversations;
    });

    ConversationService.updateConversation(
      campaignId as string,
      igsid,
      currentOrganization?.id as string,
      newPhase,
      undefined,
      user as string
    );
  };

  const fetchColumnsAndPhaseMap = async (campaignId: string) => {
    try {
      if (!currentOrganization) {
        return { columns: [], phaseMap: {} };
      }
      const leadStageRef = collection(
        FirestoreDB,
        "organizations",
        currentOrganization?.id,
        "campaigns",
        campaignId,
        "leadStages"
      );
      const data = await getDocs(leadStageRef);
      const phaseMap: Record<number, string> = {};
      const columns = data.docs.map((doc) => {
        const columnData = doc.data();
        phaseMap[columnData.index] = columnData.index;
        return {
          id: columnData.index,
          title: columnData.name,
          tasks: [],
          index: columnData.index,
          ...columnData,
        };
      });
      return { columns, phaseMap };
    } catch (error) {
      console.error("Error fetching columns:", error);
      return { columns: [], phaseMap: {} };
    }
  };

  const setColumnsAll = async (updatedConversations: IConversationUnit[]) => {
    const { columns: fetchedColumns, phaseMap } = await fetchColumnsAndPhaseMap(
      campaignId as string
    );
    const sortedColumns = fetchedColumns.sort((a, b) => a.index - b.index);
    const columnsWithTasks = fetchedColumns.map((column) => {
      const columnTasks = updatedConversations.filter(
        (task) => phaseMap[task.currentPhase] === column.index
      );
      return { ...column, tasks: columnTasks };
    });
    setColumns(columnsWithTasks);
  };

  useEffect(() => {
    setLoading(true);
    props.getAllConversations().then(async (res: any) => {
      setAllConversation(res);
      setColumnsAll(res);
      setLoading(false);
    });
    //whenever props refresh, we need to update the columns
  }, [pageID, props.refreshKey]);

  useEffect(() => {
    if (pageID) {
      setColumnsAll(allConversation);
    }
  }, [allConversation]);

  if (loading) {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors(theme).primary} />
      </View>
    );
  }
  if (!loading && allConversation && allConversation.length === 0) {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <EmptyState
          buttonName="Create a conversation"
          image={require("@/assets/images/empty-illusatration.png")}
          message="No conversations found"
          buttonPresent={false}
          onPress={() => { }}
        />
      </View>
    );
  }

  return (
    <>
      {currentConversation && (
        <ChatModal
          igsid={currentConversation?.id || ""}
          campaignId={campaignId as string}
          onCloseModal={() => setCurrentConversation(undefined)}
          conversation={currentConversation}
          theme={theme}
        />
      )}
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;
          const newPhase = parseInt(result.destination.droppableId);
          const igsid = result.draggableId;
          changePhase(igsid, newPhase);
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            display: "flex",
            overflowX: "auto",
            padding: "20px",
            backgroundColor: Colors(theme).primary,
            height: "100vh",
          }}
        >
          {columns.map((column) => (
            <Droppable key={column.index} droppableId={column.index.toString()}>
              {(provided) => (
                <div
                  style={{
                    backgroundColor: Colors(theme).background,
                    borderRadius: "3px",
                    width: "272px",
                    padding: "8px",
                    marginRight: "8px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "14px",
                      fontWeight: "bold",
                      paddingLeft: "12px",
                      alignItems: "center",
                      color: Colors(theme).text,
                    }}
                  >
                    <span>{column.title}</span>
                  </div>
                  <div style={{ flexGrow: 1, overflowY: "auto" }}>
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ConversationCard
                              task={task}
                              handleCurrentConversation={setCurrentConversation}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default CampaignsBoardWeb;
