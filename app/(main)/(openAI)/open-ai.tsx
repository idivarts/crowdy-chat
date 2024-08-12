import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  Button,
  useTheme,
  Card,
  IconButton,
} from "react-native-paper";
import Toaster from "@/shared-uis/components/toaster/Toaster";

const OpenAIComponent = () => {
  const { colors } = useTheme();
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [displayKey, setDisplayKey] = useState("");

  const handleSave = () => {
    if (!apiKey) {
      Toaster.error("Please enter an API key");
      return;
    }
    setIsEditing(false);
    setDisplayKey(apiKey.replace(/./g, "*"));
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
                  color={colors.primary}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    elevation: 4,
    borderRadius: 12,
  },
  cardTitle: {
    color: "#2196F3", // Default blue color
    fontWeight: "bold",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
  },
  cardActions: {
    justifyContent: "center",
    paddingBottom: 16,
  },
  button: {
    width: "50%",
    borderRadius: 25,
    backgroundColor: "#2196F3",
    color: "#FFF",
  },
});

export default OpenAIComponent;
