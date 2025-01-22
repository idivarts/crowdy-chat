import React, { useEffect, useState } from "react";
import { Platform, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { CreateCampaignstylesFn } from "@/styles/Dashboard.styles";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { TextModal } from "../TextInputModal/TextModal.web";
import { router, useLocalSearchParams } from "expo-router";
import { handleModalOrInputPage } from "@/helpers/TextInput";
import Button from "@/components/ui/button/Button";
import TextInput from "@/components/ui/text-input/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "react-native-paper";
import { useBreakPoints } from "@/hooks";

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

interface CampaignStepThreeProps {
  stages: Stage[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleAddStage: () => void;
  handleRemoveStage: (index: number) => void;
  handleStageChange: <K extends keyof Stage>(
    index: number,
    key: K,
    value: Stage[K]
  ) => void;
}

export const CampaignStepThree: React.FC<CampaignStepThreeProps> = ({
  stages,
  currentStep,
  setCurrentStep,
  handleAddStage,
  handleRemoveStage,
  handleStageChange,
}) => {
  const theme = useTheme();
  const styles = CreateCampaignstylesFn(theme);

  const { lg } = useBreakPoints();

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    placeholder: "",
    value: "",
    onSubmit: (value: string) => { },
  });

  const openModal = (
    title: string,
    placeholder: string,
    value: string,
    onSubmit: (value: string) => void
  ) => {
    setModalData({ isOpen: true, title, placeholder, value, onSubmit });
  };

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  const value = useLocalSearchParams().value;

  useEffect(() => {
    if (value) {
      const { textbox } = JSON.parse(value as string);
      const { title, value: textBoxValue } = textbox;

      const stageIndex = parseInt(title.split(" ")[3]);

      if (title === "Edit Stage Purpose " + stageIndex) {
        if (stages[stageIndex]) {
          handleStageChange(stageIndex, "purpose", textBoxValue);
        }
      } else if (title === "Edit Example Conversations " + stageIndex) {
        if (stages[stageIndex]) {
          handleStageChange(stageIndex, "exampleConversations", textBoxValue);
        }
      }
    }
  }, [value, currentStep]);

  return (
    <View style={styles.step3Container}>
      <View
        style={[
          styles.sidebar,
          {
            width: lg ? "30%" : "40%",
          }
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: Colors(theme).text }}>Stages</Text>
          <Button
            onPress={() => {
              handleAddStage();
              setCurrentStep(3.1 + stages.length);
            }}
          >
            Add Stage
          </Button>
        </View>
        {stages.map((stage, index) => (
          <Pressable
            key={index}
            onPress={() => setCurrentStep(3.1 + index)}
            style={[
              styles.sidebarItem,
              currentStep === 3.1 + index
                ? styles.stageActive
                : styles.stageInactive
            ]}
          >
            <Text
              style={{
                color: currentStep === 3.1 + index ? "white" : "black",
              }}
            >
              Stage {index + 1}
            </Text>
            <Pressable
              onPress={() => handleRemoveStage(index)}
            >
              <Text
                style={{
                  color: currentStep === 3.1 + index ? "white" : "black",
                }}
              >
                Remove
              </Text>
            </Pressable>
          </Pressable>
        ))}
      </View>
      <View
        style={[
          styles.mainContent,
          {
            width: lg ? "70%" : "60%",
          }
        ]}
      >
        {stages.map((stage, index) => (
          <View
            key={index}
            style={{
              display: currentStep === 3.1 + index ? "flex" : "none",
              ...styles.stageContainer,
            }}
          >
            <TextInput
              label="Stage Name"
              placeholder="Enter Stage Name"
              value={stage.name}
              onChangeText={(text) => handleStageChange(index, "name", text)}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
              }}
            >
              <TextInput
                label="Purpose of the Stage"
                value={stage.purpose}
                onChangeText={(text) =>
                  handleStageChange(index, "purpose", text)
                }
                multiline
                numberOfLines={6}
              />
              <IconButton
                onPress={() =>
                  handleModalOrInputPage({
                    isWeb: Platform.OS === "web",
                    openModal,
                    router,
                    fieldTitle: "Edit Stage Purpose " + index,
                    fieldValue: stage.purpose,
                    setFieldValue: (value) =>
                      handleStageChange(index, "purpose", value),
                    pathBack: "/campaigns/create",
                  })
                }
                style={{
                  position: "absolute",
                  right: 0,
                  top: 6,
                }}
                icon={() =>
                  <FontAwesomeIcon
                    icon={faPencil}
                    size={22}
                    color={theme.dark ? "white" : "black"}
                  />
                }
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
              }}
            >
              <TextInput
                label="Example Conversations"
                placeholder="Enter Example Conversations"
                value={stage.exampleConversations}
                onChangeText={(text) =>
                  handleStageChange(index, "exampleConversations", text)
                }
                multiline
                numberOfLines={6}
              />
              <IconButton
                onPress={() =>
                  handleModalOrInputPage({
                    isWeb: Platform.OS === "web",
                    openModal,
                    router,
                    fieldTitle: "Edit Example Conversations " + index,
                    fieldValue: stage.exampleConversations,
                    setFieldValue: (value) =>
                      handleStageChange(index, "exampleConversations", value),
                    pathBack: "/campaigns/create",
                  })
                }
                style={{
                  position: "absolute",
                  right: 0,
                  top: 6,
                }}
                icon={() =>
                  <FontAwesomeIcon
                    icon={faPencil}
                    size={22}
                    color={theme.dark ? "white" : "black"}
                  />
                }
              />
            </View>

            <Text>Collectibles</Text>
            {stage.collectibles.map((collectible, i) => (
              <View key={i} style={styles.collectibleContainer}>
                <TextInput
                  placeholder="Name"
                  value={collectible.name}
                  onChangeText={(text) => {
                    const updatedCollectibles = [...stage.collectibles];
                    updatedCollectibles[i].name = text;
                    handleStageChange(
                      index,
                      "collectibles",
                      updatedCollectibles
                    );
                  }}
                />
                <TextInput
                  placeholder="Type"
                  value={collectible.type}
                  onChangeText={(text) => {
                    const updatedCollectibles = [...stage.collectibles];
                    updatedCollectibles[i].type = text;
                    handleStageChange(
                      index,
                      "collectibles",
                      updatedCollectibles
                    );
                  }}
                />
                <TextInput
                  placeholder="Description"
                  value={collectible.description}
                  onChangeText={(text) => {
                    const updatedCollectibles = [...stage.collectibles];
                    updatedCollectibles[i].description = text;
                    handleStageChange(
                      index,
                      "collectibles",
                      updatedCollectibles
                    );
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
                  <Button
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
                  >
                    Remove
                  </Button>
                </View>
              </View>
            ))}
            <Button
              onPress={() =>
                handleStageChange(index, "collectibles", [
                  ...stage.collectibles,
                  { name: "", type: "", description: "", mandatory: false },
                ])
              }
            >
              Add Collectible
            </Button>

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
                  <TextInput
                    label="Reminder Timing"
                    placeholder="Enter Reminder Timing"
                    keyboardType="numeric"
                    value={stage.reminderTiming}
                    onChangeText={(text) =>
                      handleStageChange(index, "reminderTiming", text)
                    }
                  />
                  <TextInput
                    label="Reminder Count"
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
                    label="Reminder Examples"
                    placeholder="Enter Reminder Examples"
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
      <TextModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        placeholder={modalData.placeholder}
        value={modalData.value}
        onSubmit={modalData.onSubmit}
      />
    </View>
  );
};
