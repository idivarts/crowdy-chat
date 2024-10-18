import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ConversationService } from '@/services';
import { UpdateConversationSubject } from '@/subjects/conversation.update.subject';
import ConversationCard from './ConversationCard';
import { CAMPAIGNS_BOARD_COLUMNS } from '@/constants/CampaignsBoard';
import { CampaignsBoardColumn, IConversationUnit } from '@/types/CampaignsBoard';
import Colors from '@/constants/Colors';
import Button from '../ui/button/Button';
import { IconButton } from 'react-native-paper';
import ChatModal from './ChatModal';
import { ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { View } from '../Themed';

const CampaignsBoardWeb: React.FC = () => {
  const theme = useTheme();
  const [allConversation, setAllConversation] = useState<IConversationUnit[]>([]);
  const [currentConversation, setCurrentConversation] = useState<IConversationUnit | undefined>(undefined);
  const [columns, setColumns] = useState<CampaignsBoardColumn>([]);

  const { pageId } = useLocalSearchParams();

  const PhaseMap: Record<number, number> = {
    0: 0, 1: 0, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 1,
  };

  const getAllConversations = async () => {
    try {
      const res = await ConversationService.getConversations({
        pageId: pageId as string,
      });
      setAllConversation(res);

      handleColumnsChange(res);
    } catch (e) {
      console.error(e);
    }
  };

  const changePhase = (igsid: string, newPhase: number) => {
    // Update the backend
    ConversationService.updateConversation(igsid, {
      currentPhase: newPhase,
      status: 0,
    });

    // Update the frontend state
    setAllConversation((prevConversations) => {
      const updatedConversations = prevConversations.map((conversation) => {
        if (conversation.igsid === igsid) {
          return { ...conversation, currentPhase: newPhase, status: 0 };
        }
        return conversation;
      });

      // Update the frontend columns
      handleColumnsChange(updatedConversations);
      return updatedConversations;
    });
  };

  const handleColumnsChange = (conversations: IConversationUnit[]) => {
    const cols: CampaignsBoardColumn = CAMPAIGNS_BOARD_COLUMNS.map(col => ({
      ...col,
      tasks: [],
    }));

    for (let i = 0; i < conversations.length; i++) {
      const ele = conversations[i];
      let colIndex = PhaseMap[ele.currentPhase];
      cols[colIndex].tasks.push(ele);
    }

    setColumns(cols);
  }

  useEffect(() => {
    const subscription = UpdateConversationSubject.subscribe(() => {
      getAllConversations();
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    getAllConversations();
  }, [pageId]);

  const handleCurrentConversation = (conversation: IConversationUnit) => {
    setCurrentConversation(conversation);
  }

  if (allConversation.length === 0) {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {
        currentConversation && (
          <ChatModal
            igsid={currentConversation?.igsid || ''}
            onCloseModal={() => {
              setCurrentConversation(undefined);
            }}
            conversation={currentConversation}
          />
        )
      }
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
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            overflowX: 'auto',
            padding: '20px',
            backgroundColor: Colors(theme).primary,
            height: '100vh',
          }}
        >
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={String(column.id)}>
              {(provided) => (
                <div
                  style={{
                    backgroundColor: Colors(theme).aliceBlue,
                    borderRadius: '3px',
                    width: '272px',
                    padding: '8px',
                    marginRight: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      paddingLeft: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <span>{column.title}</span>
                    <span style={{ flex: 1 }} />
                    <IconButton
                      style={{
                        zIndex: 1,
                      }}
                      icon="refresh"
                      onPress={getAllConversations}
                    />
                  </div>
                  <div
                    style={{
                      flexGrow: 1,
                      overflowY: 'auto',
                    }}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.igsid} draggableId={task.igsid} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ConversationCard
                              task={task}
                              handleCurrentConversation={handleCurrentConversation}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  <Button
                    mode="contained"
                    onPress={() => {
                      console.log('Add a card');
                    }}
                  >
                    + Add a card
                  </Button>
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
