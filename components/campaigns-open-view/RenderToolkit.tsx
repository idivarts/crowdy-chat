import React, { useState } from "react";
import { Linking, Platform, Text, View } from "react-native";
import { IconButton, ActivityIndicator, Switch } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import { IConversationUnit } from "@/types/CampaignsBoard";

interface IRenderToolkitProps {
  conversation: IConversationUnit;
  onChangeStatus: () => void;
  syncChat: () => any;
  refreshChat: () => void;
}

export const RenderToolkit = (props: IRenderToolkitProps) => {
  const theme = useTheme();
  const [syncing, setSyncing] = useState(false);

  const handleSyncChat = async () => {
    setSyncing(true);
    try {
      const res = await props.syncChat();
      if (res) {
        setSyncing(false);
      }
    } finally {
      setSyncing(false);
    }
  };

  return (
    <View
      style={{
        flexDirection: Platform.OS === "web" ? "row" : "column",
        justifyContent: Platform.OS === "web" ? "flex-end" : "flex-start",
        alignItems: Platform.OS === "web" ? "center" : "stretch",
        backgroundColor: Colors(theme).background,
      }}
    >
      {props.conversation && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: Platform.OS !== "web" ? 10 : 0,
            backgroundColor: Colors(theme).background,
          }}
        >
          {Platform.OS !== "web" && (
            <Text style={{ color: Colors(theme).text, marginRight: 10 }}>
              Auto Chat Activation
            </Text>
          )}
          <Switch
            value={props.conversation.status === 1}
            onValueChange={() => {
              props.onChangeStatus();
              props.conversation.status =
                props.conversation.status == 1 ? 0 : 1;
            }}
            style={{ marginHorizontal: Platform.OS === "web" ? 10 : 0 }}
          />
        </View>
      )}

      {props.conversation?.user?.userProfile?.username && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: Platform.OS !== "web" ? 10 : 0,
            backgroundColor: Colors(theme).background,
          }}
        >
          {Platform.OS !== "web" && (
            <Text style={{ color: Colors(theme).text, marginRight: 10 }}>
              Open Instagram Conversation
            </Text>
          )}
          <IconButton
            icon="open-in-new"
            onPress={() =>
              Linking.openURL(
                `https://ig.me/m/${props.conversation?.user?.userProfile?.username}`
              )
            }
          />
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: Platform.OS !== "web" ? 10 : 0,
          backgroundColor: Colors(theme).background,
        }}
      >
        {Platform.OS !== "web" && (
          <Text style={{ color: Colors(theme).text, marginRight: 10 }}>
            Sync Instagram
          </Text>
        )}
        {syncing ? (
          <ActivityIndicator size="small" color={Colors(theme).primary} />
        ) : (
          <IconButton icon="download" onPress={handleSyncChat} />
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: Platform.OS !== "web" ? 10 : 0,
          backgroundColor: Colors(theme).background,
        }}
      >
        {Platform.OS !== "web" && (
          <Text style={{ color: Colors(theme).text, marginRight: 10 }}>
            Refresh Chat
          </Text>
        )}
        <IconButton icon="refresh" onPress={props.refreshChat} />
      </View>
    </View>
  );
};
