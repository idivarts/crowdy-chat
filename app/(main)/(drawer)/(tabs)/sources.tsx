import EmptyState from "@/components/EmptyState";
import ProfileCircle from "@/components/profile/ProfileCircle";
import ScreenHeader from "@/components/screen-header";
import ConnectedPage from "@/components/sources/ConnectedPage";
import FacebookLoginButton from "@/components/sources/ConnectWithFacebook";
import { Text, View } from "@/components/Themed";
import Button from "@/components/ui/button/Button";
import TextInput from "@/components/ui/text-input/TextInput";
import { useOrganizationContext } from "@/contexts";
import { useBreakPoints } from "@/hooks";
import { PageUnit } from "@/interfaces/SourcePageInterfaces";
import AppLayout from "@/layouts/app-layout";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { stylesFn } from "@/styles/sources/Sources.styles";
import { FirestoreDB } from "@/utils/firestore";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  DrawerActions,
  useIsFocused,
  useTheme,
} from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
  ActivityIndicator,
  Modal,
  Portal,
} from "react-native-paper";

const Sources = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const { xl } = useBreakPoints();
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

  const navigation = useNavigation();

  return (
    <AppLayout>
      <ScreenHeader
        title="Sources"
        rightAction
        leftIcon={!xl ? faBars : null}
        rightActionButton={<ProfileCircle />}
        action={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />
      <View style={styles.container}>
        <View style={{ flex: 1, padding: 20, paddingTop: 0 }}>
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
                <View style={{ width: "100%", gap: 16 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
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
                    contentContainerStyle={{
                      gap: 16,
                    }}
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
