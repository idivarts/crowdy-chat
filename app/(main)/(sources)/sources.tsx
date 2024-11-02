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
import { useTheme } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

const Sources = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const { lg } = useBreakPoints();
  const [modalVisible, setModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [sendGridApiKey, setSendGridApiKey] = useState("");
  const [sendGridDomain, setSendGridDomain] = useState("");
  const [loading, setLoading] = useState(true);
  const [emailUsername, setEmailUsername] = useState("");
  const [myPages, setMyPages] = useState<PageUnit[]>([]);
  const [otherPages, setOtherPages] = useState<PageUnit[]>([]);

  const getPages = async (userId: string) => {
    try {
      // const response = await axios.get("https://backend.trendshub.co.in/business/pages?userId=" + (userId ? userId : "TEMP"))
      let pData = await HttpService.getPages(userId);
      setMyPages(pData.myPages);
      setOtherPages(pData.otherPages);
      setLoading(false);
    } catch (e) {
      // addToast("Something went wrong while fetching pages", { appearance: "error" })
      Toaster.error("Something went wrong while fetching pages");
      console.log(e);
    }
  };

  useEffect(() => {
    getPages("TEMP");
  }, []);

  const handleAddSource = () => {
    setModalVisible(true);
  };

  const handleConnectSource = (source: any) => {
    if (source === "Email") {
      setEmailModalVisible(true);
    } else {
      console.log(`Connecting to ${source}`);
    }
    setModalVisible(false);
  };

  const handleEmailSubmit = () => {
    setEmailModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header
        statusBarHeight={0}
        style={{
          backgroundColor: Colors(theme).background,
        }}
      >
        {!lg && <DrawerToggle />}
        <Appbar.Content title="Sources" />
        <Appbar.Action icon="plus" onPress={handleAddSource} />
      </Appbar.Header>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          Connected Pages
        </Text>
        <View
          style={{
            alignItems: "center",
            width: "100%",
          }}
        >
          {loading && <ActivityIndicator animating={true} color="#000" />}
          {!loading &&
            otherPages.map((page, index) => (
              <ConnectedPage key={index} page={page} />
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
              onFacebookLogin={(userId) => getPages(userId ? userId : "TEMP")}
              isConnected={false}
            />
            <Button
              icon="instagram"
              mode="contained"
              style={styles.modalButton}
              onPress={() => handleConnectSource("Instagram")}
            >
              Connect with Instagram
            </Button>
            <Button
              icon="whatsapp"
              mode="contained"
              style={styles.modalButton}
              onPress={() => handleConnectSource("WhatsApp")}
            >
              Connect with WhatsApp
            </Button>
            <Button
              icon="email"
              mode="contained"
              style={styles.modalButton}
              onPress={() => handleConnectSource("Email")}
            >
              Connect with Email
            </Button>
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
  );
};

export default Sources;
