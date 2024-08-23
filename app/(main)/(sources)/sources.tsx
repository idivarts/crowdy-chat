import ConnectedPage from "@/components/sources/ConnectedPage";
import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  Appbar,
  Modal,
  Portal,
  Button,
  TextInput,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import { styles } from "@/styles/sources/Sources.styles";
import { HttpService } from "@/services/httpService";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { PageUnit } from "@/interfaces/SourcePageInterfaces";
import FacebookLoginButton from "@/components/sources/ConnectWithFacebook";

const Sources = () => {
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

  console.log("MyPages", myPages);
  console.log("OtherPages", otherPages);

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
    console.log(`SendGrid API Key: ${sendGridApiKey}`);
    console.log(`SendGrid Domain: ${sendGridDomain}`);
    console.log(`Email Username: ${emailUsername}`);
    setEmailModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
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
            <View style={styles.faceBookView}>
              <IconButton
                icon="facebook"
                onPress={handleConnectSource}
                iconColor="#FFF"
              />
              <FacebookLoginButton
                onFacebookLogin={(userId) => getPages(userId ? userId : "TEMP")}
                isConnected={false}
              />
            </View>
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
