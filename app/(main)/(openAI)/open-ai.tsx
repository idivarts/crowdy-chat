import React, { useEffect, useState } from "react";
import {
  TextInput,
  Button,
  Card,
  IconButton,
} from "react-native-paper";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { stylesFn } from "@/styles/OpenAI.styles";
import { useOrganizationContext } from "@/contexts";
import { useTheme } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";

const OpenAIComponent = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [displayKey, setDisplayKey] = useState("");
  const {
    currentOrganization,
    updateOrganization,
  } = useOrganizationContext();

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
    updateOrganization(
      currentOrganization.id,
      {
        openAIKey: apiKey,
      }).then(() => {
        setIsEditing(false);
        setDisplayKey(apiKey.replace(/./g, "*"));
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="OpenAI API Configuration"
          titleStyle={styles.cardTitle}
          left={(props) => <IconButton {...props} icon="robot" size={30} />}
        />
        <Card.Content>
          <Text style={styles.instructions}>
            To use OpenAI services, please obtain an API key from the OpenAI
            website. Visit the API section on the OpenAI website to generate
            your key.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="API Key"
              value={isEditing ? apiKey : displayKey}
              onChangeText={setApiKey}
              editable={isEditing}
              secureTextEntry={!isEditing}
              placeholder="Enter your API key"
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={isEditing ? "eye-off" : "eye"}
                  onPress={() => setIsEditing(!isEditing)}
                  color={Colors(theme).primary}
                />
              }
            />
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            onPress={isEditing ? handleSave : handleEdit}
            icon={isEditing ? "content-save" : "pencil"}
            style={styles.button}
            textColor="#FFF"
          >
            {isEditing ? "Save Key" : "Edit Key"}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default OpenAIComponent;
