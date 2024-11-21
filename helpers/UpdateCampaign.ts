import { doc, updateDoc } from "@firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { collection, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { useOrganizationContext } from "@/contexts";
import { Stage } from "@/components/campaigns/LeadStageTypes";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import {
  IEditCampaign,
  ICollectible,
  IEditLeadStage,
} from "@/interfaces/EditCampaignInterfaces";
import { AuthApp } from "@/shared-libs/utilities/auth";
import CampaignService from "@/services/campaigns.service";

export const updateCampaign = async (
  campaignData: IEditCampaign,
  campaignName: string,
  campaignObjective: string,
  organizationId: string,
  replySpeed: { min: string; max: string },
  reminderTiming: { min: string; max: string },
  prescript: string,
  campaignPurpose: string,
  actorDefinition: string,
  dialogues: string,
  stages: Stage[],
  resetForm: () => void
) => {
  if (!campaignData.id) {
    throw new Error("Campaign ID is required to update the campaign.");
  }

  const campaignColRef = doc(
    FirestoreDB,
    "organizations",
    organizationId,
    "campaigns",
    campaignData.id
  );

  await updateDoc(campaignColRef, {
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
    updatedAt: Date.now(),
  });

  // Get existing lead stages from Firestore
  const leadStagesColRef = collection(
    FirestoreDB,
    "organizations",
    organizationId,
    "campaigns",
    campaignData.id,
    "leadStages"
  );

  const existingLeadStagesSnapshot = await getDocs(leadStagesColRef);
  const existingLeadStages: IEditLeadStage[] =
    existingLeadStagesSnapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<IEditLeadStage, "id" | "collectibles">),
      id: doc.id,
      collectibles: [], // Placeholder for collectibles, fetched next
    }));

  // Map existing stage IDs
  const existingStageIds = existingLeadStages.map((stage) => stage.id);

  // Delete lead stages that no longer exist in local state
  const stagesToDelete = existingLeadStages.filter(
    (existingStage) =>
      !stages.some((stage) => stage.name === existingStage.name)
  );
  await Promise.all(
    stagesToDelete.map((stage) => deleteDoc(doc(leadStagesColRef, stage.id)))
  );

  // Now update or create stages
  await Promise.all(
    stages.map(async (stage, index) => {
      const existingStage = existingLeadStages.find(
        (s) => s.name === stage.name
      );

      let leadStageDocRef: any;
      if (existingStage) {
        // Update existing stage
        leadStageDocRef = doc(leadStagesColRef, existingStage.id);

        await updateDoc(leadStageDocRef, {
          name: stage.name,
          purpose: stage.purpose,
          reminders: {
            state: stage.reminders.state,
            reminderCount: Number(stage.reminders.reminderCount),
            reminderExamples: stage.reminders.reminderExamples,
          },
          index: index,
          exampleConversations: stage.exampleConversations,
          stopConversation: stage.stopConversation,
          leadConversion: stage.leadConversion,
        });
      } else {
        // Create a new stage
        leadStageDocRef = await addDoc(leadStagesColRef, {
          organizationId: organizationId,
          campaignId: campaignData.id,
          name: stage.name,
          purpose: stage.purpose,
          reminders: {
            state: stage.reminders.state,
            reminderCount: Number(stage.reminders.reminderCount),
            reminderExamples: stage.reminders.reminderExamples,
          },
          index: index,
          exampleConversations: stage.exampleConversations,
          stopConversation: stage.stopConversation,
          leadConversion: stage.leadConversion,
        });
      }

      // Handle collectibles deletion and update
      const collectiblesColRef = collection(
        FirestoreDB,
        "organizations",
        organizationId,
        "campaigns",
        campaignData.id,
        "leadStages",
        leadStageDocRef.id,
        "collectibles"
      );

      const existingCollectiblesSnapshot = await getDocs(collectiblesColRef);
      const existingCollectibles: ICollectible[] =
        existingCollectiblesSnapshot.docs.map(
          // fetch with id

          (doc) => ({
            ...(doc.data() as ICollectible),
            id: doc.id,
          })
        );

      // Map existing collectible IDs
      const existingCollectibleIds = existingCollectibles.map((c) => c.id);

      // Delete collectibles that no longer exist
      const collectiblesToDelete = existingCollectibles.filter(
        (existingCollectible) =>
          !stage.collectibles.some(
            (collectible) => collectible.name === existingCollectible.name
          )
      );
      await Promise.all(
        collectiblesToDelete.map((collectible) =>
          deleteDoc(doc(collectiblesColRef, collectible.id))
        )
      );

      // Update or create collectibles
      await Promise.all(
        stage.collectibles.map(async (collectible) => {
          const existingCollectible = existingCollectibles.find(
            (c) => c.name === collectible.name
          );

          if (existingCollectible) {
            // Update existing collectible
            const collectibleDocRef = doc(
              collectiblesColRef,
              existingCollectible.id
            );

            await updateDoc(collectibleDocRef, {
              name: collectible.name,
              type: collectible.type,
              description: collectible.description,
              mandatory: collectible.mandatory,
            });
          } else {
            // Create new collectible
            await addDoc(collectiblesColRef, {
              organizationId: organizationId,
              campaignId: campaignData.id,
              leadStageId: leadStageDocRef.id,
              name: collectible.name,
              type: collectible.type,
              description: collectible.description,
              mandatory: collectible.mandatory,
            });
          }
        })
      );
    })
  );

  Toaster.success("Campaign Updated Successfully");

  const idToken = await AuthApp.currentUser?.getIdToken();

  await CampaignService.createCampaign({
    campaignId: campaignData.id,
    organizationId: organizationId,
    firebaseId: idToken ? idToken : "",
  });

  resetForm();
};
