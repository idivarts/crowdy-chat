import React, { useState } from "react";
import { Linking, TouchableOpacity } from "react-native";
import { Card, IconButton, Menu, ActivityIndicator } from "react-native-paper";
import { stylesFn } from "@/styles/sources/ConnectedPage.styles";
import { HttpService } from "@/services/httpService";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import ConfirmationModal from "../ConfirmationModal";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "../Themed";
import axios from "axios";
import { useOrganizationContext } from "@/contexts";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { doc, updateDoc } from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { SourceType } from "@/shared-libs/firestore/crowdy-chat/models/sources";
import SourceService from "@/services/sources.service";

type page = {
  assistantId: string;
  id: string;
  isInstagram: boolean;
  isWebhookConnected: boolean;
  name: string;
  ownerName: string;
  reminderTimeMultiplier: number;
  replyTimeMax: number;
  replyTimeMin: number;
  userName: string;
  sourceType: SourceType;
};

interface ConnectedPageProps {
  page: page;
}

const ConnectedPage: React.FC<ConnectedPageProps> = ({ page: pageProps }) => {
  const [page, setPage] = useState(pageProps);
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => {});
  const [loading, setLoading] = useState(false);
  const { currentOrganization } = useOrganizationContext();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleExpandEvents = (page: page) => {
    if (page.userName) {
      Linking.openURL("https://www.instagram.com/" + page.userName);
    }
  };

  const connectToWebhook = async () => {
    setLoading(true);
    try {
      // await HttpService.setPageWebhook(page.id, true);
      const user = await AuthApp.currentUser?.getIdToken();
      if (!currentOrganization) return;
      if (!user) return;
      await SourceService.changeWebhook({
        pageId: page.id,
        enable: true,
        organizationId: currentOrganization?.id,
        firebaseId: user,
      }).then(async () => {
        setPage({ ...page, isWebhookConnected: true });
        Toaster.success("Successfully Connected Webhook");
      });
    } catch (e) {
      Toaster.error("Error Connecting Webhook");
    } finally {
      setLoading(false);
    }
  };

  const syncChat = async (all: boolean) => {
    setLoading(true);
    try {
      // const res = await HttpService.syncPageMessages(page.id, { all: all });
      const user = await AuthApp.currentUser?.getIdToken();

      if (!currentOrganization) return;
      if (!user) return;

      const res = await SourceService.syncChat({
        pageId: page.id,
        organizationId: currentOrganization?.id,
        firebaseId: user,
      })
        .then(() => {
          Toaster.success("Successfully Synced Chat");
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      Toaster.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const disConnectWebhook = async () => {
    setLoading(true);
    try {
      // await HttpService.setPageWebhook(page.ID, false);
      const user = await AuthApp.currentUser?.getIdToken();
      if (!currentOrganization) return;
      if (!user) return;
      await SourceService.changeWebhook({
        pageId: page.id,
        enable: false,
        organizationId: currentOrganization?.id,
        firebaseId: user,
      })
        .then(async () => {
          setPage({ ...page, isWebhookConnected: false });
        })
        .catch((e) => {
          console.log(e);
        });
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

  return (
    <>
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.leftSection}>
            <Text style={styles.title}>{page.name}</Text>
            <Text style={styles.link} onPress={() => handleExpandEvents(page)}>
              <Text style={styles.underline}>
                {page.userName ? "@" + page.userName : ""}
              </Text>
            </Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.owner}>{page.ownerName}</Text>
            <Text style={styles.platform}>{page.sourceType}</Text>
          </View>
          <View>
            {!page.isWebhookConnected ? (
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
          {page.isWebhookConnected && (
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
              <Menu.Item
                onPress={() =>
                  openConfirmationModal(
                    "Are you sure you want to sync all chats?",
                    () => syncChat(true)
                  )
                }
                title="Sync all Chat"
              />
              {/* <Menu.Item
              onPress={() =>
                openConfirmationModal(
                  "Are you sure you want to sync missing chats?",
                  () => syncChat(false)
                )
              }
              title="Sync Missing Chat"
            /> */}
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
          )}
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
    </>
  );
};

export default ConnectedPage;
