//@ts-nocheck
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
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
} from "../schemas/CampaignCreateSchema";
import { CampaignStepOne } from "./CreateCampaignStages/CampaignStageOne";
import { CampaignStepTwo } from "./CreateCampaignStages/CampaignStageTwo";
import { CampaignStepThree } from "./CreateCampaignStages/CampaignStageThree";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { Icon, Portal } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { ICampaigns } from "@/shared-libs/firestore/crowdy-chat/models/campaigns";
import { ILeads } from "@/shared-libs/firestore/crowdy-chat/models/leads";
import { useOrganizationContext } from "@/contexts";
import { Stage, Collectible, Reminder } from "../campaigns/LeadStageTypes";
import { CreateCampaignstylesFn } from "@/styles/Dashboard.styles";

const CreateCampaign = () => {
  const theme = useTheme();
  const styles = CreateCampaignstylesFn(theme);
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [campaignObjective, setCampaignObjective] = useState("");
  const [replySpeed, setReplySpeed] = useState({ min: "", max: "" });
  const [reminderTiming, setReminderTiming] = useState({ min: "", max: "" });
  const [prescript, setPrescript] = useState("");
  const [campaignPurpose, setCampaignPurpose] = useState("");
  const [actorDefinition, setActorDefinition] = useState("");
  const [dialogues, setDialogues] = useState("");
  const { currentOrganization } = useOrganizationContext();
  const [stages, setStages] = useState<Stage[]>([
    {
      name: "",
      purpose: "",
      collectibles: [],
      reminderTiming: "",
      stopConversation: false,
      leadConversion: false,
      reminders: {
        state: false,
        reminderCount: "",
        reminderExamples: "",
      },
      exampleConversations: "",
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
        reminders: {
          state: false,
          reminderCount: "",
          reminderExamples: "",
        },
        exampleConversations: "",
      },
    ]);
    setCurrentStep(3.1 + stages.length);
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

  const handleNext = async () => {
    try {
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

      if (!validation?.success) {
        return Toaster.error(validation?.error.issues[0].message);
      }

      if (currentStep >= 3) {
        // Campaign creation logic
        const campaignColRef = collection(FirestoreDB, "campaigns");
        if (!currentOrganization) {
          return Toaster.error("Organization not found");
        }
        const campaignData: ICampaigns = {
          chatgpt: {
            prescript,
            actor: actorDefinition,
            examples: dialogues,
            purpose: campaignPurpose,
          },
          assistantId: "",
          name: campaignName,
          objective: campaignObjective,
          replySpeed: {
            min: Number(replySpeed.min),
            max: Number(replySpeed.max),
          },
          reminderTiming: {
            min: Number(reminderTiming.min),
            max: Number(reminderTiming.max),
          },
          organizationId: currentOrganization?.id,
          createdBy: "1",
          createdAt: Date.now(),
          updatedAt: Date.now(),
          status: 1,
          leadStages: undefined,
        };

        const campaignDocRef = await addDoc(campaignColRef, campaignData);

        const leadStages = stages.map((stage) => ({
          organizationId: currentOrganization?.id,
          campaignId: campaignDocRef.id,
          name: stage.name,
          purpose: stage.purpose,
          collectibles: undefined,
          reminders: { state: false, reminderCount: 0, reminderExamples: "" },
          exampleConversations: "",
          stopConversation: stage.stopConversation,
          leadConversion: stage.leadConversion,
        }));

        const leadStagesColRef = collection(FirestoreDB, "leadStages");
        const leadStageDocs = await Promise.all(
          leadStages.map((stage) => addDoc(leadStagesColRef, stage))
        );

        const collectiblesColRef = collection(FirestoreDB, "collectibles");
        await Promise.all(
          leadStages.map((stage, index) => {
            //@ts-ignore
            const stageCollectibles = stage.collectibles.map(
              (collectible: Collectible) => ({
                organizationId: currentOrganization?.id,
                campaignId: campaignDocRef.id,
                leadStageId: leadStageDocs[index].id,
                name: collectible,
                type: 1,
                createdBy: "1",
                createdAt: Date.now(),
                updatedAt: Date.now(),
                status: 1,
              })
            );
            return Promise.all(
              stageCollectibles.map((collectible: Collectible) =>
                addDoc(collectiblesColRef, collectible)
              )
            );
          })
        );

        // Update campaign with leadStages
        await updateDoc(doc(FirestoreDB, "campaigns", campaignDocRef.id), {
          leadStages: leadStages.map((stage) => stage.name),
        });

        Toaster.success("Campaign Created Successfully");
        // Reset state
        resetForm();
      } else {
        setCurrentStep(currentStep + 1);
        if (currentStep === 2) {
          setCurrentStep(3.1);
        }
      }
    } catch (error) {
      Toaster.error(
        "An error occurred while creating the campaign. Please try again."
      );
    }
  };

  const resetForm = () => {
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
        reminders: {
          state: false,
          reminderCount: "",
          reminderExamples: "",
        },
        exampleConversations: "",
      },
    ]);
    setCurrentStep(1);
    setModalVisible(false);
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return CampaignStepOne(
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
      return CampaignStepTwo(
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
      return CampaignStepThree(
        stages,
        currentStep,
        setCurrentStep,
        handleAddStage,
        handleRemoveStage,
        handleStageChange
      );
    }
  };

  const renderProgressDots = () => {
    const steps = [1, 2, 3];
    return (
      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              currentStep >= step && styles.activeProgressDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Create Campaign" onPress={() => setModalVisible(true)} />
      <Portal>
        <Modal transparent={true} visible={modalVisible} animationType="fade">
          <View style={styles.backdrop}>
            <View style={styles.modalContainer}>
              <Text style={styles.header}>Create Campaign</Text>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 1,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
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
                        setCurrentStep(2);
                      } else {
                        setCurrentStep(currentStep - 1);
                      }
                    }}
                  />
                  <Button
                    title={currentStep < 3 ? "Next" : "Submit"}
                    onPress={() => {
                      handleNext();
                    }}
                  />
                </View>
                {renderProgressDots()}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default CreateCampaign;
