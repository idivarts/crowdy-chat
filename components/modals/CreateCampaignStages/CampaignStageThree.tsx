import React from "react";
import { View, Button, TouchableOpacity } from "react-native";
import { Text, TextInput } from "react-native-paper";
import Checkbox from "expo-checkbox";
import { CreateCampaignstyles as styles } from "@/styles/Dashboard.styles";

type Stage = {
  name: string;
  purpose: string;
  collectibles: string[];
  reminderTiming: string;
  stopConversation: boolean;
  leadConversion: boolean;
};

export const CampaignStepThree = (
  stages: Stage[],
  currentStep: number,
  setCurrentStep: (step: number) => void,
  handleAddStage: () => void,
  handleRemoveStage: (index: number) => void,
  handleStageChange: <K extends keyof Stage>(
    index: number,
    key: K,
    value: Stage[K]
  ) => void
) => (
  <View style={styles.step3Container}>
    <View style={styles.sidebar}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#1b1b1b",
          }}
        >
          Stages
        </Text>
        <Button title="Add Stage" onPress={handleAddStage} />
      </View>
      {stages.map((stage, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setCurrentStep(3.1 + index)}
          style={
            currentStep === 3.1 + index
              ? styles.stageActive
              : styles.stageInactive
          }
        >
          <Text style={styles.sidebarItem}>Stage {index + 1}</Text>
          <TouchableOpacity
            onPress={() => handleRemoveStage(index)}
            style={styles.sidebarItem}
          >
            <Text style={styles.sidebarItem}>Remove</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.mainContent}>
      {stages.map((stage, index) => (
        <View
          key={index}
          style={{
            display: currentStep === 3.1 + index ? "flex" : "none",
            ...styles.stageContainer,
          }}
        >
          <Text>Stage Name</Text>
          <TextInput
            style={styles.input3}
            value={stage.name}
            onChangeText={(text) => handleStageChange(index, "name", text)}
          />

          <Text>Purpose of the Stage</Text>
          <TextInput
            style={styles.input3}
            value={stage.purpose}
            onChangeText={(text) => handleStageChange(index, "purpose", text)}
          />

          <Text>Collectibles</Text>
          {stage.collectibles.map((collectible, i) => (
            <View key={i} style={styles.rowStage3}>
              <TextInput
                style={styles.textAreaStage3}
                value={collectible}
                onChangeText={(text) => {
                  const updatedCollectibles = [...stage.collectibles];
                  updatedCollectibles[i] = text;
                  handleStageChange(index, "collectibles", updatedCollectibles);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  const updatedCollectibles = stage.collectibles.filter(
                    (_, j) => j !== i
                  );
                  handleStageChange(index, "collectibles", updatedCollectibles);
                }}
                style={styles.removeCollectible}
              >
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          <Button
            title="Add Collectible"
            onPress={() =>
              handleStageChange(index, "collectibles", [
                ...stage.collectibles,
                "",
              ])
            }
          />

          <Text>Reminder Timing</Text>
          <TextInput
            style={styles.input3}
            keyboardType="numeric"
            value={stage.reminderTiming}
            onChangeText={(text) =>
              handleStageChange(index, "reminderTiming", text)
            }
          />
          <View style={styles.row}>
            <Checkbox
              value={stage.stopConversation}
              onValueChange={(value) =>
                handleStageChange(index, "stopConversation", value)
              }
            />
            <Text>Stop Conversation After This Stage</Text>
          </View>
          <View style={styles.row}>
            <Checkbox
              value={stage.leadConversion}
              onValueChange={(value) =>
                handleStageChange(index, "leadConversion", value)
              }
            />
            <Text>Lead Conversion at This Stage</Text>
          </View>
        </View>
      ))}
    </View>
  </View>
);
