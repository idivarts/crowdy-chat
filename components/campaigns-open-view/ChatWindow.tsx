import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  IconButton,
  Switch,
  TextInput,
  Tooltip,
} from "react-native-paper";
import { IConversationUnit } from "@/types/CampaignsBoard";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { MessageObject } from "@/types/Message";
import { FlatList } from "react-native";
import MessageItem from "./MessageItem";
import InformationPanel from "./InformationPanel";
import { useBreakPoints } from "@/hooks";
import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "../Themed";
import { doc, getDoc } from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { IConversation } from "@/shared-libs/firestore/crowdy-chat/models/conversations";
import {
  ConversationService,
  MessageService,
  PageActionsService,
} from "@/services";
import axios from "axios";
import { AuthApp } from "@/shared-libs/utilities/auth";
import ConfirmationModal from "../ConfirmationModal";
import { useLocalSearchParams } from "expo-router";
import { useOrganizationContext } from "@/contexts";

interface IProps {
  handleCloseModal: () => void;
  igsid: string;
  campaignId: string;
  conversation: IConversationUnit;
  theme: any;
}

const ChatWindow: React.FC<IProps> = (props) => {
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [after, setAfter] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const [conversation, setConversation] = useState<IConversation | undefined>(
    undefined
  );
  const theme = props.theme;
  const [msg, setMsg] = useState("");
  const [botInst, setBotInst] = useState("");
  const { lg, sm, md } = useBreakPoints();
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => {});
  const { currentOrganization } = useOrganizationContext();

  const loadMessages = async (after: any) => {
    setLoading(true);
    const user = await AuthApp.currentUser?.getIdToken();
    if (!user || !currentOrganization) return;

    await ConversationService.getConversationById(
      props.campaignId,
      props.conversation.id,
      after,
      user,
      currentOrganization?.id
    )
      .then((res) => {
        if (after === undefined) setMessages(res.data.data);
        else setMessages([...messages, ...res.data.data]);
        setAfter(res.data.paging.cursors.after);
      })
      .catch((e) => {
        props.handleCloseModal();
        console.error(e);
        Toaster.error("Failed to load messages.");
      });

    setLoading(false);
  };

  const fetchUser = async () => {
    try {
      if (!currentOrganization) return;

      const conservationDoc = doc(
        FirestoreDB,
        "organizations",
        currentOrganization?.id,
        "campaigns",
        props.campaignId,
        "conversations",
        props.conversation.id
      );
      const conservationData = await getDoc(conservationDoc);
      setConversation(conservationData.data() as IConversation);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadMessages(after);
    fetchUser();
  }, []);

  const syncChat = async () => {
    const user = await AuthApp.currentUser?.getIdToken();
    PageActionsService.syncPageMessages(
      props.conversation.id,
      props.campaignId,
      currentOrganization?.id as string,
      user
    )
      .then((res) => {
        Toaster.success("Sync in progress. Please check after sometime");
      })
      .catch((e) => {
        Toaster.error("Somthing went wrong");
      });
  };

  const refreshChat = () => {
    setMessages([]);
    setAfter(undefined);
    loadMessages(undefined);
  };

  const onSendMessage = async (isBot: boolean) => {
    if (!msg) return;
    const user = await AuthApp.currentUser?.getIdToken();
    const newMessage: MessageObject = {
      id: Date.now().toString(), // Temporary unique ID
      message: msg,
      from: {
        id: isBot ? "bot-id" : "user-id",
        username: isBot ? "Bot" : "User",
      },
      to: { data: [{ id: "page-id", username: "Page" }] },
      created_time: new Date().toISOString(),
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setMsg("");

    if (!user || !currentOrganization) return;
    MessageService.sendMessage(
      props.campaignId,
      props.conversation.id,
      {
        sendType: isBot ? "bot" : "page",
        message: msg,
        botInstruction: botInst,
      },
      currentOrganization?.id,
      user
    )
      .then((r) => {})
      .catch((e) => {
        Toaster.error("Somthing went wrong");
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== newMessage.id)
        );
      });
    setMsg("");
  };

  const onResumeMessage = async () => {
    if (!msg) return;
    const user = await AuthApp.currentUser?.getIdToken();
    if (!user || !currentOrganization) return;
    MessageService.sendMessage(
      props.campaignId,
      props.conversation.id,
      {
        sendType: "page",
        message: msg,
        botInstruction: botInst,
      },
      currentOrganization?.id,
      user
    )
      .then((r) => {})
      .catch((e) => {
        Toaster.error("Somthing went wrong");
      });
    setMsg("");
    setBotInst("");
  };

  const onChangeStatus = async () => {
    const prevStatus = conversation?.status;
    setConversation((conv: any) => {
      conv.status = conv.status == 0 ? 1 : 0;
      return { ...conv };
    });

    const user = await AuthApp.currentUser?.getIdToken();

    if (!user || !currentOrganization) return;

    ConversationService.updateConversation(
      props.campaignId,
      props.conversation.id,
      currentOrganization?.id as string,
      undefined,
      conversation?.status == 0 ? 1 : 0,
      user
    )
      .then((r) => {
        Toaster.success("Status updated successfully");
      })
      .catch((e) => {
        setConversation((conv: any) => {
          conv.conversation.status = prevStatus;
          return { ...conv };
        });
      });
  };

  const shouldRenderData = (
    ind: any,
    prevMsg: MessageObject,
    msg: MessageObject
  ) => {
    if (ind == 0) return true;
    if (prevMsg.from.id == msg.from.id) {
      const prevDate = new Date(prevMsg.created_time);
      const nowDate = new Date(msg.created_time);
      // Calculate the time difference in milliseconds
      const timeDiff = Math.abs(prevDate.getTime() - nowDate.getTime());

      // Convert milliseconds to hours
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      if (hoursDiff <= 1) return false;
    }
    return true;
  };

  const openConfirmationModal = (message: string, action: () => void) => {
    setModalMessage(message);
    setModalAction(() => action);
    setConfirmationModalVisible(true);
  };

  if (!conversation || !messages || !props.igsid) {
    return (
      <View
        style={{
          backgroundColor: Colors(theme).background,
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
        width: lg ? 900 : sm || md ? 540 : 320,
        backgroundColor: Colors(theme).background,
        padding: 20,
        borderRadius: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 4,
          backgroundColor: Colors(theme).background,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <IconButton
          icon="keyboard-backspace"
          onPress={props.handleCloseModal}
        />
        {/* <ImageComponent
          url={props.conversation.user.profilePic}
          style={{
            marginRight: 10,
          }}
        /> */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: Colors(theme).background,
          }}
        >
          <Text
            style={{
              color: Colors(theme).text,
            }}
          >
            {props.conversation.user.userProfile?.name ||
              props.conversation.user.userProfile?.username ||
              props.conversation.id}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: Colors(theme).background,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: Colors(theme).background,
            }}
          >
            {conversation && (
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
                    value={conversation.status == 1}
                    onValueChange={onChangeStatus}
                    style={{
                      backgroundColor: Colors(theme).background,
                    }}
                  />
                </Tooltip>
              </View>
            )}
            {props.conversation?.user?.userProfile?.username && (
              <Tooltip
                enterTouchDelay={100}
                leaveTouchDelay={0}
                title="Open Conversation on Instagram"
              >
                <IconButton
                  icon="open-in-new"
                  onPress={() =>
                    window.open(
                      `https://ig.me/m/${props.conversation?.user?.userProfile?.username}`,
                      "_blank"
                    )
                  }
                />
              </Tooltip>
            )}
            <Tooltip
              enterTouchDelay={100}
              leaveTouchDelay={0}
              title="Sync Instagram"
            >
              <IconButton
                icon="download"
                onPress={() =>
                  openConfirmationModal(
                    "Are you sure you want to sync all chats?",
                    syncChat
                  )
                }
              />
            </Tooltip>
            <Tooltip
              enterTouchDelay={100}
              leaveTouchDelay={0}
              title="Refresh the user chats"
            >
              <IconButton icon="refresh" onPress={refreshChat} />
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
            flex: 1,
            backgroundColor: Colors(theme).background,
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <MessageItem
              igsid={props.igsid}
              index={index}
              messages={messages}
              msg={item}
              shouldRenderData={shouldRenderData}
              theme={theme}
            />
          )}
          onEndReached={() => {
            if (!loading && after != "") {
              loadMessages(after);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 22,
                  backgroundColor: Colors(theme).background,
                }}
              >
                <ActivityIndicator />
              </View>
            ) : null
          }
          inverted
        />
        {showInfo && <InformationPanel conversation={props.conversation} />}
      </View>
      {props.conversation.currentPhase == 7 ? (
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
              placeholder="Write a message on behalf of user"
              value={msg}
              onChangeText={(value) => {
                setMsg(value);
              }}
              style={{
                backgroundColor: Colors(theme).background,
              }}
            />
            <TextInput
              mode="outlined"
              placeholder="Write a prompt for chat assistant"
              style={{
                marginTop: 3,
                backgroundColor: Colors(theme).background,
              }}
              value={botInst}
              onChangeText={(value) => {
                setBotInst(value);
              }}
            />
          </View>
          <View>
            <Tooltip
              enterTouchDelay={100}
              leaveTouchDelay={0}
              title="Send Message as User"
            >
              <IconButton icon="send" onPress={() => onResumeMessage()} />
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
            backgroundColor: Colors(theme).background,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: Colors(theme).background,
            }}
          >
            <TextInput
              mode="outlined"
              placeholder="Write a message or prompt"
              value={msg}
              onChangeText={(value) => {
                setMsg(value);
              }}
              style={{
                backgroundColor: Colors(theme).background,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: Colors(theme).background,
            }}
          >
            <Tooltip
              enterTouchDelay={100}
              leaveTouchDelay={0}
              title="Send instructions to bot"
            >
              <IconButton
                icon="robot"
                onPress={() => onSendMessage(true)}
                iconColor={Colors(theme).primary}
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
                iconColor={Colors(theme).primary}
              />
            </Tooltip>
          </View>
        </View>
      )}
      <ConfirmationModal
        visible={confirmationModalVisible}
        message={modalMessage}
        handleSubmit={() => {
          modalAction();
          setConfirmationModalVisible(false);
        }}
        handleCancel={() => setConfirmationModalVisible(false)}
      />
    </View>
  );
};

export default ChatWindow;
