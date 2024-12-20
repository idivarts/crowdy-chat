import ConnectedPage from "@/components/sources/ConnectedPage";
import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import React, { useEffect, useState } from "react";
import {
  Appbar,
  Modal,
  Portal,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import { stylesFn } from "@/styles/sources/Sources.styles";
import { HttpService } from "@/services/httpService";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { PageUnit } from "@/interfaces/SourcePageInterfaces";
import FacebookLoginButton from "@/components/sources/ConnectWithFacebook";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { collection, getDocs } from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { useOrganizationContext } from "@/contexts";
import { FlatList } from "react-native";
import EmptyState from "@/components/EmptyState";
import AppLayout from "@/layouts/app-layout";
import ProfileIcon from "@/components/profile/ProfileIcon";
import Profile from "@/components/profile/Profile";
import ProfileCircle from "@/components/profile/ProfileCircle";
import OrganizationSwitcherMenu from "@/components/org-switcher";

const Sources = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const { lg, xl } = useBreakPoints();
  const [modalVisible, setModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [sendGridApiKey, setSendGridApiKey] = useState("");
  const [sendGridDomain, setSendGridDomain] = useState("");
  const { currentOrganization } = useOrganizationContext();
  const [loading, setLoading] = useState(true);
  const [emailUsername, setEmailUsername] = useState("");
  const [myPages, setMyPages] = useState<PageUnit[]>([]);
  const [otherPages, setOtherPages] = useState<PageUnit[]>([]);
  const isFocused = useIsFocused();

  const getPages = async () => {
    try {
      if (!currentOrganization) {
        return;
      }

      const sourceRef = collection(
        FirestoreDB,
        "organizations",
        currentOrganization?.id,
        "sources"
      );
      const sourceSnapshot = await getDocs(sourceRef);
      const sourceData = sourceSnapshot.docs.map(
        (doc) => doc.data() as PageUnit
      );
      setMyPages(sourceData);
      setOtherPages(sourceData);
      setLoading(false);
    } catch (e) {
      Toaster.error("Something went wrong while fetching pages");
    }
  };

  useEffect(() => {
    getPages();
  }, [, isFocused]);

  const handleAddSource = () => {
    setModalVisible(true);
  };

  const handleConnectSource = (source: any) => {
    if (source === "Email") {
      setEmailModalVisible(true);
    } else {
    }
    setModalVisible(false);
  };

  const handleEmailSubmit = () => {
    setEmailModalVisible(false);
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <Appbar.Header
          statusBarHeight={0}
          style={{
            backgroundColor: Colors(theme).background,
            gap: 10,
          }}
        >
          {!lg && <DrawerToggle />}
          <Appbar.Content title="Sources" />
          <Appbar.Action icon="plus" onPress={handleAddSource} />
          <ProfileCircle />
        </Appbar.Header>
        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{
              alignItems: "center",
              width: "100%",
              flex: 1,
            }}
          >
            {loading && <ActivityIndicator animating={true} color="#000" />}
            {!loading &&
              (otherPages.length !== 0 ? (
                <View style={{ width: "100%", flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginVertical: 10,
                    }}
                  >
                    Connected Pages
                  </Text>
                  <FlatList
                    data={otherPages}
                    renderItem={({ item, index }) => (
                      <ConnectedPage page={item} key={index} />
                    )}
                    keyExtractor={(item) => item.id}
                    style={{ width: "100%" }}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              ) : (
                <EmptyState
                  image={require("@/assets/images/empty-illusatration.png")}
                  message="No connected pages"
                  buttonPresent={true}
                  onPress={handleAddSource}
                  buttonName="Connect a Page"
                />
              ))}
          </View>
        </View>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Connect to a Source</Text>
              <FacebookLoginButton
                onFacebookLogin={(userId) => getPages()}
                isConnected={false}
              />
            </View>
          </Modal>
          <Modal
            visible={emailModalVisible}
            onDismiss={() => setEmailModalVisible(false)}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Connect with Email</Text>
              <TextInput
                label="SendGrid API Key"
                value={sendGridApiKey}
                onChangeText={setSendGridApiKey}
                mode="outlined"
                style={styles.modalInput}
              />
              <TextInput
                label="SendGrid Domain"
                value={sendGridDomain}
                onChangeText={setSendGridDomain}
                mode="outlined"
                style={styles.modalInput}
              />
              <TextInput
                label="Email Username"
                value={emailUsername}
                onChangeText={setEmailUsername}
                mode="outlined"
                style={styles.modalInput}
              />
              <Button
                mode="contained"
                style={styles.modalButton}
                onPress={handleEmailSubmit}
              >
                Submit
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </AppLayout>
  );
};

export default Sources;
