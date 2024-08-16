import React, { useState } from "react";
import { View, Text, Linking } from "react-native";
import { Card, IconButton, Menu } from "react-native-paper";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { styles } from "@/styles/sources/ConnectedPage.styles";

type page = {
  name: string;
  userName: string;
  ownerName: string;
  pageType: string;
};

interface ConnectedPageProps {
  page: page;
}

const ConnectedPage: React.FC<ConnectedPageProps> = ({ page: pageProps }) => {
  const [page, setPage] = useState(pageProps);
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible);

  const handleExpandEvents = (page: page) => {
    if (page.userName) {
      Linking.openURL("https://www.instagram.com/" + page.userName);
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View style={styles.leftSection}>
          <Text style={styles.title}>{page.name}</Text>
          <Text style={styles.link} onPress={() => handleExpandEvents(page)}>
            <Text style={styles.underline}>@{page.userName}</Text>
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.owner}>{page.ownerName}</Text>
          <Text style={styles.platform}>{page.pageType}</Text>
        </View>
        <View>
          <IconButton icon="send" style={styles.iconButton} />
        </View>
        <Menu
          visible={visible}
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
          <Menu.Item onPress={() => {}} title="Change Assistant" />
          <Menu.Item onPress={() => {}} title="Sync all Chat" />
          <Menu.Item onPress={() => {}} title="Sync Missing Chat" />
          <Menu.Item onPress={() => {}} title="Disconnect Webhook" />
        </Menu>
      </View>
    </Card>
  );
};

export default ConnectedPage;
