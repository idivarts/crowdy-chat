import React, { createRef, useEffect, useRef, useState } from 'react';

// import InformationPanel from './components/InformationPanel';
import { OpenConvfirmationModal } from '@/subjects/modal.subject';
import { UpdateConversationSubject } from '@/subjects/conversation.update.subject';
import ImageComponent from './ImageComponent.web';
import { ActivityIndicator, IconButton, Switch, TextInput, Tooltip } from 'react-native-paper';
import { IConversationByIdResponse } from '@/services/conversation.service';
import { IConversationUnit } from '@/types/CampaignsBoard';
import Toaster from '@/shared-uis/components/toaster/Toaster';
import {
  ConversationService,
  MessageService,
  PageActionsService,
} from '@/services';
import { MessageObject } from '@/types/Message';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native';
import MessageItem from './MessageItem';

interface IProps {
  handleCloseModal?: () => any
  igsid: string
  conversation: IConversationUnit
}

const ChatWindow: React.FC<IProps> = (props) => {
  const [showInfo, setShowInfo] = useState(false)
  const [loading, setLoading] = useState(true)
  const [after, setAfter] = useState<string | undefined>(undefined)
  const [messages, setMessages] = useState<MessageObject[]>([])
  const [conversation, setConversation] = useState<IConversationByIdResponse | undefined>(undefined)
  const [msg, setMsg] = useState("")
  const [botInst, setBotInst] = useState("")

  console.log("Messages", messages);
  console.log("Conversation", conversation);

  const loadMessages = async (after: any) => {
    setLoading(true)
    await MessageService.getMessages(props.igsid, { limit: 10, after }).then(res => {
      if (after === undefined)
        setMessages(res.data)
      else
        setMessages([...messages, ...res.data])
      console.log("After ", res.paging.cursors.after);

      setAfter(res.paging.cursors.after)
    }).catch(e => {

    })
    setLoading(false)
  }

  const fetchUser = () => {
    ConversationService.getConversationById(props.igsid).then(res => {
      setConversation(res)
    })
  }

  useEffect(() => {
    loadMessages(after);
    fetchUser()

    UpdateConversationSubject.subscribe(data => {
      setConversation({
        ...conversation,
        conversation: data,
        // page: conversation?.page
      })
    })
  }, [])

  // const refObj = useRef<HTMLDivElement>()

  // const handleScroll = () => {
  //   const { scrollTop, scrollHeight, clientHeight } = refObj.current;
  //   const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

  //   // console.log('Scrolled', scrollTop, scrollHeight, clientHeight);

  //   if (scrollPercentage <= -80) {
  //     // Trigger your function here
  //     if (!loading && after != "") {
  //       console.log('Scrolled to 80% or more', scrollPercentage, loading, after);
  //       loadMessages(after)
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (refObj?.current) {
  //     const fnc = () => {
  //       handleScroll()
  //     }
  //     refObj.current.addEventListener('scroll', fnc);
  //     return () => {
  //       if (refObj?.current)
  //         refObj.current.removeEventListener('scroll', fnc);
  //     };
  //   }
  // }, [after, loading]);

  const syncChat = () => {
    PageActionsService.syncPageMessages(conversation!.page!.pageId, {
      all: false,
      igsid: props.igsid
    }).then(res => {
      Toaster.success("Sync in progress. Please check after sometime");
    }).catch(e => {
      Toaster.error("Somthing went wrong");
    })
  }

  const refreshChat = () => {
    setMessages([]);
    setAfter(undefined)
    loadMessages(undefined)
  }

  const onSendMessage = async (isBot: boolean) => {
    if (!msg)
      return;
    MessageService.sendMessage(props.igsid, {
      sendType: isBot ? "bot" : "page",
      message: isBot ? undefined : msg,
      botInstruction: isBot ? msg : undefined
    }).then(r => {

    }).catch(e => {
      Toaster.error("Somthing went wrong");
    })
    setMsg("")
  }

  const onResumeMessage = async () => {
    if (!msg)
      return;

    MessageService.sendMessage(props.igsid, {
      sendType: "user",
      message: msg,
      botInstruction: botInst
    }).then(r => {

    }).catch(e => {
      Toaster.error("Somthing went wrong");
    })
    setMsg("")
    setBotInst("")
  }

  const onChangeStatus = () => {
    const prevStatus = conversation?.conversation.status;
    setConversation((conv: any) => {
      conv.conversation.status = conv.conversation.status == 0 ? 1 : 0
      return { ...conv }
    })
    ConversationService.updateConversation(conversation!.conversation.igsid, {
      status: prevStatus == 0 ? 1 : 0
    }).then(r => {
      UpdateConversationSubject.next(r.conversation)
    }).catch(e => {
      setConversation((conv: any) => {
        conv.conversation.status = prevStatus
        return { ...conv }
      })
    })
  }

  const shouldRenderData = (ind: any, prevMsg: MessageObject, msg: MessageObject) => {
    if (ind == 0)
      return true
    if (prevMsg.from.id == msg.from.id) {
      const prevDate = new Date(prevMsg.created_time)
      const nowDate = new Date(msg.created_time)
      // Calculate the time difference in milliseconds
      const timeDiff = Math.abs(prevDate.getTime() - nowDate.getTime());

      // Convert milliseconds to hours
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      if (hoursDiff <= 1)
        return false
    }
    return true
  }

  if (!conversation || !messages || !props.igsid) {
    return (
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 22,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        width: 900,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 4,
          backgroundColor: "#f7f7f8",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <IconButton
          icon="keyboard-backspace"
          onPress={() => props.handleCloseModal}
        />
        <ImageComponent
          url={props.conversation.user.profilePic}
          style={{
            marginRight: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text>
            {props.conversation.user.name || props.conversation.user.userName || props.conversation.igsid}
          </Text>
        </View>

        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {
              conversation &&
              <View
                style={{
                  marginRight: 10,
                }}
              >
                <Tooltip
                  enterTouchDelay={100}
                  leaveTouchDelay={0}
                  title="Status of automatic chat activation"
                >
                  <Switch
                    value={conversation.conversation.status == 1}
                    onValueChange={onChangeStatus}
                  // checked={conversation.conversation.status == 1}
                  />
                </Tooltip>
              </View>
            }
            {
              props.conversation?.user?.userName &&
              <Tooltip
                enterTouchDelay={100}
                leaveTouchDelay={0}
                title="Open Conversation on Instagram"
              >
                <IconButton
                  icon="open-in-new"
                  onPress={() => window.open(`https://ig.me/m/${props.conversation?.user?.userName}`, "_blank")}
                />
              </Tooltip>
            }
            <Tooltip
              enterTouchDelay={100}
              leaveTouchDelay={0}
              title="Sync Instagram"
            >
              <IconButton
                icon="download"
                onPress={() => OpenConvfirmationModal.next({
                  message: "Are you sure you want to completely sync the instagram chat on backend?",
                  handleSubmit: syncChat
                })}
              />
            </Tooltip>
            <Tooltip
              enterTouchDelay={100}
              leaveTouchDelay={0}
              title="Refresh the user chats"
            >
              <IconButton
                icon="refresh"
                onPress={refreshChat}
              />
            </Tooltip>
            <Tooltip
              enterTouchDelay={100}
              leaveTouchDelay={0}
              title="Open info about this user"
            >
              <IconButton
                icon="information"
                onPress={() => setShowInfo(!showInfo)}
              />
            </Tooltip>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <FlatList
          data={messages}
          style={{
            padding: 12,
            maxHeight: 400,
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <MessageItem
              igsid={props.igsid}
              index={index}
              messages={messages}
              msg={item}
              shouldRenderData={shouldRenderData}
            />
          )}
          onEndReached={() => {
            if (!loading && after != "") {
              loadMessages(after)
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? (
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 22,
              }}
            >
              <ActivityIndicator />
            </View>
          ) : null}
          inverted
        />
        {/* {showInfo && <InformationPanel conversation={conversation} />} */}
      </View>
      {
        props.conversation.currentPhase == 7 ? (
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderTopColor: "#ccc",
            borderTopWidth: 1,
          }}>
            <View
              style={{
                flex: 1,
              }}
            >
              <TextInput
                mode="outlined"
                placeholder="Write a message on behalf of user"
                value={msg}
                onChangeText={value => { setMsg(value) }}
              />
              <TextInput
                mode="outlined"
                placeholder="Write a prompt for chat assistant"
                style={{ marginTop: 3 }}
                value={botInst}
                onChangeText={value => { setBotInst(value) }}
              />
            </View>
            <View>
              <Tooltip
                enterTouchDelay={100}
                leaveTouchDelay={0}
                title="Send Message as User"
              >
                <IconButton
                  icon="send"
                  onPress={() => onResumeMessage()}
                />
              </Tooltip>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderTopColor: "#ccc",
              borderTopWidth: 1,
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <TextInput
                mode="outlined"
                placeholder="Write a message or prompt"
                value={msg}
                onChangeText={value => { setMsg(value) }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Tooltip
                enterTouchDelay={100}
                leaveTouchDelay={0}
                title="Send instructions to bot"
              >
                <IconButton
                  icon="robot"
                  onPress={() => onSendMessage(true)}
                />
              </Tooltip>
              <Tooltip
                enterTouchDelay={100}
                leaveTouchDelay={0}
                title="Send Message"
              >
                <IconButton
                  icon="send"
                  onPress={() => onSendMessage(false)}
                />
              </Tooltip>
            </View>
          </View>
        )}
    </View>
  );
}

export default ChatWindow;
