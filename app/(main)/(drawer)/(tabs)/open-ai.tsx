import React, { useEffect, useState } from "react";
import {
  Card,
  IconButton,
} from "react-native-paper";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { stylesFn } from "@/styles/OpenAI.styles";
import { useOrganizationContext } from "@/contexts";
import { DrawerActions, useTheme } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import AppLayout from "@/layouts/app-layout";
import { useBreakPoints } from "@/hooks";
import ProfileCircle from "@/components/profile/ProfileCircle";
import { faBars, faRobot } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "expo-router";
import ScreenHeader from "@/components/screen-header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import TextInput from "@/components/ui/text-input/TextInput";
import Button from "@/components/ui/button/Button";

const OpenAIComponent = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [displayKey, setDisplayKey] = useState("");
  const { currentOrganization, updateOrganization } = useOrganizationContext();

  useEffect(() => {
    setApiKey(currentOrganization?.openAIKey || "");
    setDisplayKey(currentOrganization?.openAIKey?.replace(/./g, "*") || "");
  }, [currentOrganization]);

  const handleSave = () => {
    if (!apiKey) {
      Toaster.error("Please enter an API key");
      return;
    }

    if (!currentOrganization?.id) {
      return;
    }

    // Update the organization's openAIKey field
    updateOrganization(currentOrganization.id, {
      openAIKey: apiKey,
    }).then(() => {
      setIsEditing(false);
      setDisplayKey(apiKey.replace(/./g, "*"));
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  const { xl } = useBreakPoints();
  const navigation = useNavigation();

  return (
    <AppLayout>
      <ScreenHeader
        title="Open AI"
        rightAction
        leftIcon={!xl ? faBars : null}
        rightActionButton={<ProfileCircle />}
        action={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />
      <View style={styles.container}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.cardTitle}>OpenAI API Configuration</Text>
            <FontAwesomeIcon
              icon={faRobot}
              size={24}
              color={Colors(theme).text}
            />
          </View>
          <Card.Content
            style={{
              paddingHorizontal: 0,
            }}
          >
            <Text style={styles.instructions}>
              To use OpenAI services, please obtain an API key from the OpenAI
              website. Visit the API section on the OpenAI website to generate
              your key.
            </Text>
            <TextInput
              label={isEditing ? "API Key" : "API Key (Hidden)"}
              value={isEditing ? apiKey : displayKey}
              onChangeText={setApiKey}
              disabled={!isEditing}
              secureTextEntry={!isEditing}
              theme={{
                colors: {
                  text: Colors(theme).text,
                  disabled: Colors(theme).text,
                  background: Colors(theme).lightgray,
                },
              }}
              containerStyle={styles.inputContainer}
              icon={
                <IconButton
                  icon={isEditing ? "eye-off" : "eye"}
                  onPress={() => {
                    setIsEditing(!isEditing);
                  }}
                  size={18}
                  iconColor={Colors(theme).text}
                />
              }
            />
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="contained"
              onPress={isEditing ? handleSave : handleEdit}
              icon={isEditing ? "content-save" : "pencil"}
            >
              {isEditing ? "Save Key" : "Edit Key"}
            </Button>
          </Card.Actions>
        </View>
      </View>
    </AppLayout>
  );
};

export default OpenAIComponent;
