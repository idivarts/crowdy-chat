import React, { useEffect, useState } from "react";
import { View, Button, ScrollView } from "react-native";
import { CreateCampaignstylesFn } from "@/styles/Dashboard.styles";
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
} from "@/components/schemas/CampaignCreateSchema";
import { CampaignStepOne } from "@/components/modals/CreateCampaignStages/CampaignStageOne";
import { ICampaigns } from "@/shared-libs/firestore/crowdy-chat/models/campaigns";
import { CampaignStepTwo } from "@/components/modals/CreateCampaignStages/CampaignStageTwo";
import { CampaignStepThree } from "@/components/modals/CreateCampaignStages/CampaignStageThree";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { useNavigation, useRouter } from "expo-router";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { useOrganizationContext } from "@/contexts";
import { Stage } from "@/components/campaigns/LeadStageTypes";
import { updateCampaign } from "@/helpers/UpdateCampaign";
import { createCampaign } from "@/helpers/CreateCampaign";
import {
  IEditCampaign,
  ICollectible,
  IEditLeadStage,
} from "@/interfaces/EditCampaignInterfaces";
import { useTheme } from "@react-navigation/native";

const CreateCampaign = ({ campaignData }: { campaignData?: IEditCampaign }) => {
  const theme = useTheme();
  const styles = CreateCampaignstylesFn(theme);
  const navigation = useNavigation();
  const router = useRouter();
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
      collectibles: [],
      exampleConversations: "",
      leadConversion: false,
      name: "",
      purpose: "",
      reminderTiming: "",
      reminders: { reminderCount: "0", reminderExamples: "", state: false },
      stopConversation: false,
    },
  ]);

  useEffect(() => {
    if (!campaignData) return;
    if (!campaignData.leadStages) return;

    if (campaignData) {
      setCampaignName(campaignData.name);
      setCampaignObjective(campaignData.objective);
      setReplySpeed({
        min: campaignData.replySpeed.min.toString(),
        max: campaignData.replySpeed.max.toString(),
      });
      setReminderTiming({
        min: campaignData.reminderTiming.min.toString(),
        max: campaignData.reminderTiming.max.toString(),
      });
      setPrescript(campaignData.chatgpt.prescript);
      setCampaignPurpose(campaignData.chatgpt.purpose);
      setActorDefinition(campaignData.chatgpt.actor);
      setDialogues(campaignData.chatgpt.examples);
      setStages(
        campaignData.leadStages.map((leadStage: any) => ({
          name: leadStage.name,
          purpose: leadStage.purpose,
          reminderTiming: leadStage.reminderTiming, // Ensure this property is included
          reminders: {
            state: leadStage.reminders.state,
            reminderCount: leadStage.reminders.reminderCount.toString(),
            reminderExamples: leadStage.reminders.reminderExamples,
          },
          exampleConversations: leadStage.exampleConversations,
          stopConversation: leadStage.stopConversation,
          leadConversion: leadStage.leadConversion,
          collectibles: leadStage.collectibles.map((collectible: any) => ({
            name: collectible.name,
            type: collectible.type,
            description: collectible.description,
            mandatory: collectible.mandatory,
          })),
        }))
      );
    }
  }, [campaignData]);

  const user = AuthApp.currentUser;

  const [modalVisible, setModalVisible] = useState(false);

  const handleAddStage = () => {
    setStages([
      ...stages,
      {
        collectibles: [],
        exampleConversations: "",
        leadConversion: false,
        name: "",
        purpose: "",
        reminderTiming: "",
        reminders: { reminderCount: "0", reminderExamples: "", state: false },
        stopConversation: false,
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
        collectibles: [],
        exampleConversations: "",
        leadConversion: false,
        name: "",
        purpose: "",
        reminderTiming: "",
        reminders: { reminderCount: "0", reminderExamples: "", state: false },
        stopConversation: false,
      },
    ]);
    setCurrentStep(1);
    setModalVisible(false);
  };

  const handleNext = async () => {
    try {
      if (!user) {
        return Toaster.error("User not found. Please login again.");
      }
      if (!currentOrganization?.id) {
        return Toaster.error("Organization not found. Please try again.");
      }

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
        console.log(validation?.error.issues);
        return Toaster.error(validation?.error.issues[0].message);
      }

      if (currentStep >= 3 && !campaignData) {
        await createCampaign(
          campaignName,
          campaignObjective,
          replySpeed,
          reminderTiming,
          prescript,
          campaignPurpose,
          user.uid,
          actorDefinition,
          currentOrganization.id,
          dialogues,
          stages,
          resetForm
        ).then(() => {
          router.replace("/(main)/(campaigns)/campaigns");
        });
      }

      // Proceed with update logic
      if (currentStep >= 3 && campaignData) {
        await updateCampaign(
          campaignData,
          campaignName,
          campaignObjective,
          currentOrganization.id,
          replySpeed,
          reminderTiming,
          prescript,
          campaignPurpose,
          actorDefinition,
          dialogues,
          stages,
          resetForm
        ).then(() => {
          router.replace("/(main)/(campaigns)/campaigns");
        });
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
      console.error("Error creating campaign", error);
    }
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
      <ScrollView
        style={{
          width: "100%",
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderStepContent()}
      </ScrollView>
      {renderProgressDots()}
      <View style={styles.BottomRow}>
        <Button
          title={currentStep === 1 ? "Close" : "Previous"}
          onPress={() => {
            if (currentStep === 1) {
              navigation.goBack();
            } else if (currentStep > 3 && currentStep < 3 + stages.length) {
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
    </View>
  );
};

export default CreateCampaign;
