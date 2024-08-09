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
import { renderStepOne } from "./CreateCampaignStages/CampaignStageOne";
import { renderStepTwo } from "./CreateCampaignStages/CampaignStageTwo";
import { renderStepThree } from "./CreateCampaignStages/CampaignStageThree";
import Toaster from "@/shared-uis/components/toaster/Toaster";

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
        // toast.success("Campaign Created Successfully");
        Toaster.success("Campaign Created Successfully");
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
      // toast.error(validation?.error.issues[0].message);
      Toaster.error(validation?.error.issues[0].message);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return renderStepOne(
        campaignName,
        setCampaignName,
        campaignObjective,
        setCampaignObjective,
        replySpeed,
        setReplySpeed,
        reminderTiming,
        setReminderTiming
      );
    } else if (currentStep === 2) {
      return renderStepTwo(
        prescript,
        setPrescript,
        campaignPurpose,
        setCampaignPurpose,
        actorDefinition,
        setActorDefinition,
        dialogues,
        setDialogues
      );
    } else {
      return renderStepThree(
        stages,
        currentStep,
        setCurrentStep,
        handleAddStage,
        handleRemoveStage,
        handleStageChange
      );
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
