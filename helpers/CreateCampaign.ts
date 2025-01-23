import { Stage } from "@/components/campaigns/LeadStageTypes";
import CampaignService from "@/services/campaigns.service";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { AuthApp } from "@/utils/auth";
import { FirestoreDB } from "@/utils/firestore";
import { addDoc, collection } from "firebase/firestore";

export const createCampaign = async (
  campaignName: string,
  campaignObjective: string,
  replySpeed: { min: string; max: string },
  reminderTiming: { min: string; max: string },
  prescript: string,
  campaignPurpose: string,
  userId: string,
  actorDefinition: string,
  organizationId: string,
  dialogues: string,
  stages: Stage[],
  resetForm: () => void
) => {
  const campaignColRef = collection(
    FirestoreDB,
    "organizations",
    organizationId,
    "campaigns"
  );
  const campaignData = {
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
    organizationId: organizationId,
    createdBy: userId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    status: 2,
  };

  const campaignDocRef = await addDoc(campaignColRef, campaignData);

  const leadStages = stages.map((stage, index) => ({
    organizationId: organizationId,
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
    index: index,
  }));

  const leadStagesColRef = collection(
    FirestoreDB,
    "organizations",
    organizationId,
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
      organizationId,
      "campaigns",
      campaignDocRef.id,
      "leadStages",
      leadStage.id,
      "collectibles"
    );

    const collectibles = stages[index].collectibles.map((collectible) => ({
      organizationId: organizationId,
      campaignId: campaignDocRef.id,
      leadStageId: leadStage.id,
      name: collectible.name,
      type: collectible.type,
      description: collectible.description,
      mandatory: collectible.mandatory,
    }));

    return collectibles.map((collectible) => {
      addDoc(collectiblesColRef, collectible);
    });
  });

  const idToken = await AuthApp.currentUser?.getIdToken();

  await CampaignService.createCampaign({
    campaignId: campaignDocRef.id,
    organizationId: organizationId,
    firebaseId: idToken ? idToken : "",
  });

  Toaster.success("Campaign Created Successfully");
  resetForm();
};
