import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { ConversationService } from '@/services';
import { UpdateConversationSubject } from '@/subjects/conversation.update.subject';
import ConversationCard from './ConversationCard.web';
import { CAMPAIGNS_BOARD_COLUMNS } from '@/constants/CampaignsBoard';
import { CampaignsBoardColumn } from '@/types/CampaignsBoard';
import Colors from '@/constants/Colors';
import Button from '../ui/button/Button';
import { IconButton } from 'react-native-paper';
import { useConversationContext } from '@/contexts/conversation-context.provider';
// import ChatModal from '@/components/chat-modal/ChatModal';

const CampaignsBoardWeb: React.FC = () => {
  const { setAllConversation, allConversation, currentConversation, setCurrentConversation } = useConversationContext();
  const [columns, setColumns] = useState<CampaignsBoardColumn>([]);

  const { pageId } = useParams<any>();

  const PhaseMap: Record<number, number> = {
    0: 0, 1: 0, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 1,
  };

  const getAllConversations = async () => {
    try {
      const res = await ConversationService.getConversations({ pageId });
      setAllConversation(res);

      // Create a copy of the columns
      const cols: CampaignsBoardColumn = CAMPAIGNS_BOARD_COLUMNS.map(col => ({
        ...col,
        tasks: [], // Clear previous tasks
      }));

      for (let i = 0; i < res.length; i++) {
        const ele = res[i];
        let colIndex = PhaseMap[ele.currentPhase];
        cols[colIndex].tasks.push(ele);
      }

      setColumns(cols);
    } catch (e) {
      console.error(e);
    }
  };

  const changePhase = (igsid: string, newPhase: number) => {
    ConversationService.updateConversation(igsid, {
      currentPhase: newPhase,
      status: 0,
    });

    setAllConversation((allCs) =>
      allCs.map((c) => (c.igsid === igsid ? { ...c, currentPhase: newPhase, status: 0 } : c))
    );
  };

  useEffect(() => {
    const subscription = UpdateConversationSubject.subscribe(() => {
      getAllConversations();
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    getAllConversations();
  }, [pageId]);

  return (
    <>
      {
        // currentConversation && (
        //   <ChatModal
        //     igsid={currentConversation.igsid}
        //     onCloseModal={() => setCurrentConversation(undefined)}
        //     conversation={currentConversation}
        //   />
        // )
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
            backgroundColor: Colors.regular.primary,
            height: '100vh',
          }}
        >
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={String(column.id)}>
              {(provided) => (
                <div
                  style={{
                    backgroundColor: Colors.regular.aliceBlue,
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
                    <IconButton icon="refresh" onPress={getAllConversations} />
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
                              setCurrentConversation={setCurrentConversation}
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
