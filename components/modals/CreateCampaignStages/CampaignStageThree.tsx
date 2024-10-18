import React from "react";
import { Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import Checkbox from "expo-checkbox";
import { CreateCampaignstylesFn } from "@/styles/Dashboard.styles";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";

type Collectible = {
  name: string;
  type: string;
  description: string;
  mandatory: boolean;
};

type Reminder = {
  state: boolean;
  reminderCount: string;
  reminderExamples: string;
};

type Stage = {
  name: string;
  purpose: string;
  collectibles: Collectible[];
  reminderTiming: string;
  stopConversation: boolean;
  leadConversion: boolean;
  reminders: Reminder;
  exampleConversations: string;
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
) => {
  const theme = useTheme();
  const styles = CreateCampaignstylesFn(theme);

  return (
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
          <Text style={{ color: "#1b1b1b" }}>Stages</Text>
          <Button
            title="Add Stage"
            onPress={() => {
              handleAddStage();
              setCurrentStep(3.1 + stages.length);
            }}
          />
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

            <Text>Example Conversations</Text>
            <TextInput
              style={styles.input3}
              value={stage.exampleConversations}
              onChangeText={(text) =>
                handleStageChange(index, "exampleConversations", text)
              }
            />

            <Text>Collectibles</Text>
            {stage.collectibles.map((collectible, i) => (
              <View key={i} style={styles.collectibleContainer}>
                <TextInput
                  style={styles.input3}
                  placeholder="Name"
                  value={collectible.name}
                  onChangeText={(text) => {
                    const updatedCollectibles = [...stage.collectibles];
                    updatedCollectibles[i].name = text;
                    handleStageChange(index, "collectibles", updatedCollectibles);
                  }}
                />
                <TextInput
                  style={styles.input3}
                  placeholder="Type"
                  value={collectible.type}
                  onChangeText={(text) => {
                    const updatedCollectibles = [...stage.collectibles];
                    updatedCollectibles[i].type = text;
                    handleStageChange(index, "collectibles", updatedCollectibles);
                  }}
                />
                <TextInput
                  style={styles.input3}
                  placeholder="Description"
                  value={collectible.description}
                  onChangeText={(text) => {
                    const updatedCollectibles = [...stage.collectibles];
                    updatedCollectibles[i].description = text;
                    handleStageChange(index, "collectibles", updatedCollectibles);
                  }}
                />
                <View style={styles.row}>
                  <Checkbox
                    value={collectible.mandatory}
                    onValueChange={(value) => {
                      const updatedCollectibles = [...stage.collectibles];
                      updatedCollectibles[i].mandatory = value;
                      handleStageChange(
                        index,
                        "collectibles",
                        updatedCollectibles
                      );
                    }}
                  />
                  <Text>Mandatory</Text>
                  <TouchableOpacity
                    onPress={() => {
                      const updatedCollectibles = stage.collectibles.filter(
                        (_, j) => j !== i
                      );
                      handleStageChange(
                        index,
                        "collectibles",
                        updatedCollectibles
                      );
                    }}
                    style={styles.removeCollectible}
                  >
                    <Text style={{ color: "#fff" }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <Button
              title="Add Collectible"
              onPress={() =>
                handleStageChange(index, "collectibles", [
                  ...stage.collectibles,
                  { name: "", type: "", description: "", mandatory: false },
                ])
              }
            />

            <Text>Reminders</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                width: "100%",
              }}
            >
              <View
                style={[
                  styles.row,
                  {
                    marginBottom: 8,
                  },
                ]}
              >
                <Checkbox
                  value={stage.reminders.state}
                  onValueChange={(value) =>
                    handleStageChange(index, "reminders", {
                      ...stage.reminders,
                      state: value,
                    })
                  }
                />
                <Text>Enable Reminders</Text>
              </View>
              {stage.reminders.state && (
                <>
                  <Text>Reminder Timing</Text>
                  <TextInput
                    style={styles.input3}
                    keyboardType="numeric"
                    value={stage.reminderTiming}
                    onChangeText={(text) =>
                      handleStageChange(index, "reminderTiming", text)
                    }
                  />
                  <Text>Reminder Count</Text>
                  <TextInput
                    style={styles.input3}
                    keyboardType="numeric"
                    placeholder="Reminder Count"
                    value={stage.reminders.reminderCount}
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9]/g, "");
                      handleStageChange(index, "reminders", {
                        ...stage.reminders,
                        reminderCount: numericValue,
                      });
                    }}
                  />
                  <TextInput
                    style={styles.input3}
                    placeholder="Reminder Examples"
                    value={stage.reminders.reminderExamples}
                    onChangeText={(text) =>
                      handleStageChange(index, "reminders", {
                        ...stage.reminders,
                        reminderExamples: text,
                      })
                    }
                  />
                </>
              )}
            </View>
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
};
