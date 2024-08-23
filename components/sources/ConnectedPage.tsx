import React, { useState } from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { Card, IconButton, Menu, ActivityIndicator } from "react-native-paper";
import { styles } from "@/styles/sources/ConnectedPage.styles";
import { HttpService } from "@/services/httpService";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import ConfirmationModal from "../ConfirmationModal";
import AssistantModal from "../AssistantModal";

type page = {
  assistantId: string;
  id: string;
  isInstagram: boolean;
  isWebHookConnected: boolean;
  name: string;
  ownerName: string;
  reminderTimeMultiplier: number;
  replyTimeMax: number;
  replyTimeMin: number;
  userName: string;
};

interface ConnectedPageProps {
  page: page;
}

const ConnectedPage: React.FC<ConnectedPageProps> = ({ page: pageProps }) => {
  const [page, setPage] = useState(pageProps);
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [assistantModalVisible, setAssistantModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => {});
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleExpandEvents = (page: page) => {
    if (page.userName) {
      Linking.openURL("https://www.instagram.com/" + page.userName);
    }
  };

  const connectToWebhook = async () => {
    setLoading(true);
    try {
      await HttpService.setPageWebhook(page.id, true);
      setPage({ ...page, isWebHookConnected: true });
      Toaster.success("Successfully Connected Webhook");
    } catch (e) {
      Toaster.error("Error Connecting Webhook");
    } finally {
      setLoading(false);
    }
  };

  const syncChat = async (all: boolean) => {
    setLoading(true);
    try {
      const res = await HttpService.syncPageMessages(page.id, { all: all });
      Toaster.success(res.message);
    } catch (e) {
      Toaster.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const disConnectWebhook = async () => {
    setLoading(true);
    try {
      await HttpService.setPageWebhook(page.id, false);
      setPage({ ...page, isWebHookConnected: false });
      Toaster.success("Successfully Disconnected Webhook");
    } catch (e) {
      Toaster.error("Error Disconnecting Webhook");
    } finally {
      setLoading(false);
    }
  };

  const openConfirmationModal = (message: string, action: () => void) => {
    setModalMessage(message);
    setModalAction(() => action);
    setConfirmationModalVisible(true);
    setMenuVisible(false);
  };

  const openAssistantModal = () => {
    setAssistantModalVisible(true);
    setMenuVisible(false);
  };

  return (
    <>
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.leftSection}>
            <Text style={styles.title}>{page.name}</Text>
            <Text style={styles.link} onPress={() => handleExpandEvents(page)}>
              <Text style={styles.underline}>
                {page.isInstagram ? "@" + page.userName : null}
              </Text>
            </Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.owner}>{page.ownerName}</Text>
            <Text style={styles.platform}>
              {page.isInstagram ? "Instagram" : "Facebook"}
            </Text>
          </View>
          <View>
            {!page.isWebHookConnected ? (
              <TouchableOpacity
                onPress={() =>
                  openConfirmationModal(
                    "Are you sure you want to connect the webhook?",
                    connectToWebhook
                  )
                }
              >
                <IconButton icon={"link"} style={styles.iconButton} />
              </TouchableOpacity>
            ) : null}
          </View>
          <View>
            <IconButton icon="send" style={styles.iconButton} />
          </View>
          <Menu
            visible={menuVisible}
            onDismiss={toggleMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={toggleMenu}
                style={styles.iconButton}
              />
            }
            contentStyle={{ marginTop: 40, backgroundColor: "#fff" }}
          >
            <Menu.Item onPress={openAssistantModal} title="Change Assistant" />
            <Menu.Item
              onPress={() =>
                openConfirmationModal(
                  "Are you sure you want to sync all chats?",
                  () => syncChat(true)
                )
              }
              title="Sync all Chat"
            />
            <Menu.Item
              onPress={() =>
                openConfirmationModal(
                  "Are you sure you want to sync missing chats?",
                  () => syncChat(false)
                )
              }
              title="Sync Missing Chat"
            />
            <Menu.Item
              onPress={() =>
                openConfirmationModal(
                  "Are you sure you want to disconnect the webhook?",
                  disConnectWebhook
                )
              }
              title="Disconnect Webhook"
            />
          </Menu>
        </View>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </Card>

      <ConfirmationModal
        visible={confirmationModalVisible}
        message={modalMessage}
        handleSubmit={() => {
          modalAction();
          setConfirmationModalVisible(false);
        }}
        handleCancel={() => setConfirmationModalVisible(false)}
      />

      {assistantModalVisible && (
        <AssistantModal
          page={page}
          setPage={setPage}
          handleCloseModal={() => setAssistantModalVisible(false)}
        />
      )}
    </>
  );
};

export default ConnectedPage;
