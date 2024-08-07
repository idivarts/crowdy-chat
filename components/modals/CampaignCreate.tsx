import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import Checkbox from "expo-checkbox";
import { CreateCampaignstyles as styles } from "@/styles/Dashboard.styles";
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
} from "../schemas/CampaignCreateSchema";
import { toast, ToastContainer } from "react-toastify";

type Stage = {
  name: string;
  purpose: string;
  collectibles: string[];
  reminderTiming: string;
  stopConversation: boolean;
  leadConversion: boolean;
};

const CreateCampaign = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [campaignObjective, setCampaignObjective] = useState("");
  const [replySpeed, setReplySpeed] = useState({ min: "", max: "" });
  const [reminderTiming, setReminderTiming] = useState({ min: "", max: "" });
  const [prescript, setPrescript] = useState("");
  const [campaignPurpose, setCampaignPurpose] = useState("");
  const [actorDefinition, setActorDefinition] = useState("");
  const [dialogues, setDialogues] = useState("");
  const [stages, setStages] = useState<Stage[]>([
    {
      name: "",
      purpose: "",
      collectibles: [],
      reminderTiming: "",
      stopConversation: false,
      leadConversion: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const handleAddStage = () => {
    setStages([
      ...stages,
      {
        name: "",
        purpose: "",
        collectibles: [],
        reminderTiming: "",
        stopConversation: false,
        leadConversion: false,
      },
    ]);
  };

  const handleRemoveStage = (index: number) => {
    const updatedStages = stages.filter((_, i) => i !== index);
    setStages(updatedStages);
    if (currentStep > 3.1 + index) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 3.1 + index) {
      setCurrentStep(3);
    }
  };

  const handleStageChange = <K extends keyof Stage>(
    index: number,
    key: K,
    value: Stage[K]
  ) => {
    const updatedStages = [...stages];
    updatedStages[index][key] = value;
    setStages(updatedStages);
  };

  const handleNext = () => {
    let validation;
    if (currentStep === 1) {
      validation = stepOneSchema.safeParse({
        campaignName,
        campaignObjective,
        replySpeed,
        reminderTiming,
      });
    } else if (currentStep === 2) {
      validation = stepTwoSchema.safeParse({
        prescript,
        campaignPurpose,
        actorDefinition,
        dialogues,
      });
    } else if (currentStep >= 3) {
      validation = stepThreeSchema.safeParse({ stages });
    }

    if (validation?.success) {
      if (currentStep >= 3) {
        toast.success("Campaign Created Successfully");
        setCampaignName("");
        setCampaignObjective("");
        setReplySpeed({ min: "", max: "" });
        setReminderTiming({ min: "", max: "" });
        setPrescript("");
        setCampaignPurpose("");
        setActorDefinition("");
        setDialogues("");
        setStages([
          {
            name: "",
            purpose: "",
            collectibles: [],
            reminderTiming: "",
            stopConversation: false,
            leadConversion: false,
          },
        ]);
        setCurrentStep(1);
        setModalVisible(false);
      } else {
        setCurrentStep(currentStep + 1);
        if (currentStep > 3) {
          setModalVisible(false);
        }
      }
    } else {
      // validation?.error.issues.forEach((issue) => (issue.message));
      toast.error(validation?.error.issues[0].message);
    }
  };

  const renderStepOne = () => (
    <View style={styles.stepContainer}>
      <ToastContainer />
      <Text>Campaign Name</Text>
      <TextInput
        style={styles.input}
        value={campaignName}
        onChangeText={setCampaignName}
      />

      <Text>Campaign Objective</Text>
      <TextInput
        style={styles.input}
        value={campaignObjective}
        onChangeText={setCampaignObjective}
      />

      <Text>Reply Speed</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Min"
          keyboardType="numeric"
          value={replySpeed.min}
          onChangeText={(text) => setReplySpeed({ ...replySpeed, min: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Max"
          keyboardType="numeric"
          value={replySpeed.max}
          onChangeText={(text) => setReplySpeed({ ...replySpeed, max: text })}
        />
      </View>

      <Text>Reminder Timing</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Min"
          keyboardType="numeric"
          value={reminderTiming.min}
          onChangeText={(text) =>
            setReminderTiming({ ...reminderTiming, min: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Max"
          keyboardType="numeric"
          value={reminderTiming.max}
          onChangeText={(text) =>
            setReminderTiming({ ...reminderTiming, max: text })
          }
        />
      </View>
    </View>
  );

  const renderStepTwo = () => (
    <View style={styles.stepContainer}>
      <ToastContainer />
      <Text>Prescript</Text>
      <TextInput
        style={styles.textArea}
        value={prescript}
        onChangeText={setPrescript}
        multiline
      />

      <Text>Purpose of the Campaign</Text>
      <TextInput
        style={styles.textArea}
        value={campaignPurpose}
        onChangeText={setCampaignPurpose}
        multiline
      />

      <Text>Actor Definition</Text>
      <TextInput
        style={styles.textArea}
        value={actorDefinition}
        onChangeText={setActorDefinition}
        multiline
      />

      <Text>Dialogues and Examples</Text>
      <TextInput
        style={styles.textArea}
        value={dialogues}
        onChangeText={setDialogues}
        multiline
      />
    </View>
  );

  const renderStepThree = () => (
    <View style={styles.step3Container}>
      <ToastContainer />
      <View style={styles.sidebar}>
        <Button title="Add Stage" onPress={handleAddStage} />
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
              style={styles.input}
              value={stage.name}
              onChangeText={(text) => handleStageChange(index, "name", text)}
            />

            <Text>Purpose of the Stage</Text>
            <TextInput
              style={styles.input}
              value={stage.purpose}
              onChangeText={(text) => handleStageChange(index, "purpose", text)}
            />

            <Text>Collectibles</Text>
            {stage.collectibles.map((collectible, i) => (
              <View key={i} style={styles.row}>
                <TextInput
                  style={styles.input}
                  value={collectible}
                  onChangeText={(text) => {
                    const updatedCollectibles = [...stage.collectibles];
                    updatedCollectibles[i] = text;
                    handleStageChange(
                      index,
                      "collectibles",
                      updatedCollectibles
                    );
                  }}
                />
                <Button
                  title="Remove"
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
                />
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
              style={styles.input}
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

  const renderStepContent = () => {
    if (currentStep === 1) {
      return renderStepOne();
    } else if (currentStep === 2) {
      return renderStepTwo();
    } else {
      return renderStepThree();
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Create Campaign" onPress={() => setModalVisible(true)} />
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.header}>Create Campaign</Text>
            <ScrollView contentContainerStyle={styles.modalContent}>
              {renderStepContent()}
              <View style={styles.BottomRow}>
                <Button
                  title={currentStep === 1 ? "Close" : "Previous"}
                  onPress={() => {
                    if (currentStep === 1) {
                      setModalVisible(false);
                    } else if (
                      currentStep > 3 &&
                      currentStep < 3 + stages.length
                    ) {
                      setCurrentStep(3);
                    } else {
                      setCurrentStep(currentStep - 1);
                    }
                  }}
                />
                <Button
                  title={currentStep < 3 ? "Next" : "Submit"}
                  onPress={() => {
                    console.log("currentStep", currentStep);
                    handleNext();
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateCampaign;
