//@ts-nocheck
import React, { useState } from "react";
import { View, Button, ScrollView } from "react-native";
import { CreateCampaignstyles as styles } from "@/styles/Dashboard.styles";
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
} from "@/components/schemas/CampaignCreateSchema";
import { CampaignStepOne } from "@/components/modals/CreateCampaignStages/CampaignStageOne";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ICampaigns } from "@/shared-libs/firestore/crowdy-chat/models/campaigns";
import { CampaignStepTwo } from "@/components/modals/CreateCampaignStages/CampaignStageTwo";
import { CampaignStepThree } from "@/components/modals/CreateCampaignStages/CampaignStageThree";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { useNavigation } from "expo-router";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { useOrganizationContext } from "@/contexts";
import { Stage } from "@/components/campaigns/LeadStageTypes";

const CreateCampaign = () => {
  const navigation = useNavigation();
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
        return Toaster.error(validation?.error.issues[0].message);
      }

      if (currentStep >= 3) {
        // Campaign creation logic
        const campaignColRef = collection(
          FirestoreDB,
          "organizations",
          currentOrganization.id,
          "campaigns"
        );
        const campaignData: ICampaigns = {
          chatgpt: {
            prescript,
            actor: actorDefinition,
            examples: dialogues,
            purpose: campaignPurpose,
          },
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
          organizationId: currentOrganization.id,
          createdBy: user?.uid,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          status: 2,
        };

        const campaignDocRef = await addDoc(campaignColRef, campaignData);

        const leadStages = stages.map((stage) => ({
          organizationId: currentOrganization.id,
          campaignId: campaignDocRef.id,
          name: stage.name,
          purpose: stage.purpose,
          reminders: {
            state: stage.reminders.state,
            reminderCount: Number(stage.reminders.reminderCount),
            reminderExamples: stage.reminders.reminderExamples,
          },
          exampleConversations: stage.exampleConversations,
          stopConversation: stage.stopConversation,
          leadConversion: stage.leadConversion,
        }));

        const leadStagesColRef = collection(
          FirestoreDB,
          "organizations",
          currentOrganization.id,
          "campaigns",
          campaignDocRef.id,
          "leadStages"
        );
        const leadStageDocs = await Promise.all(
          leadStages.map((stage) => addDoc(leadStagesColRef, stage))
        );

        const collectibleStage = leadStageDocs.map((leadStage, index) => {
          const collectiblesColRef = collection(
            FirestoreDB,
            "organizations",
            currentOrganization.id,
            "campaigns",
            campaignDocRef.id,
            "leadStages",
            leadStage.id,
            "collectibles"
          );

          const collectibles = stages[index].collectibles.map(
            (collectible) => ({
              organizationId: currentOrganization.id,
              campaignId: campaignDocRef.id,
              leadStageId: leadStage.id,
              name: collectible.name,
              type: collectible.type,
              description: collectible.description,
              mandatory: collectible.mandatory,
            })
          );

          return collectibles.map((collectible) => {
            addDoc(collectiblesColRef, collectible);
          });
        });

        Toaster.success("Campaign Created Successfully");
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
      console.error("Error creating campaign", error);
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
