import ConnectedPage from "@/components/sources/ConnectedPage";
import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Appbar, Modal, Portal, Button, TextInput } from "react-native-paper";
import { styles } from "@/styles/sources/Sources.styles";

const Sources = () => {
  const { lg } = useBreakPoints();
  const [modalVisible, setModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [sendGridApiKey, setSendGridApiKey] = useState("");
  const [sendGridDomain, setSendGridDomain] = useState("");
  const [emailUsername, setEmailUsername] = useState("");

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
          <ConnectedPage
            page={{
              name: "Trendy Page",
              userName: "Trendly.Pro",
              ownerName: "Owner Name",
              pageType: "Instagram",
            }}
          />
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
            <Button
              icon="facebook"
              mode="contained"
              style={styles.modalButton}
              onPress={() => handleConnectSource("Facebook")}
            >
              Connect with Facebook
            </Button>
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
