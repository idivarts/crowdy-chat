import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { toast } from "react-toastify";

const OpenAIComponent = () => {
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [displayKey, setDisplayKey] = useState("");

  const handleSave = () => {
    if (!apiKey) {
      toast.error("Please enter an API key");
      return;
    }
    setIsEditing(false);
    toast.success("API key saved");
    setDisplayKey(apiKey.replace(/./g, "*")); // Hide API key with asterisks
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OpenAI</Text>
      <Text style={styles.instructions}>
        To use OpenAI services, please obtain an API key from the OpenAI
        website. Visit the API section on the OpenAI website to generate your
        key.
      </Text>
      <TextInput
        style={styles.input}
        value={isEditing ? apiKey : displayKey}
        onChangeText={setApiKey}
        editable={isEditing}
        secureTextEntry={!isEditing}
        placeholder="Enter your API key"
      />
      <Button
        title={isEditing ? "Save" : "Edit"}
        onPress={isEditing ? handleSave : handleEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default OpenAIComponent;
