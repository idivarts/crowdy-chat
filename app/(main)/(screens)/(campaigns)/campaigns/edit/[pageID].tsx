import { useOrganizationContext } from "@/contexts";
import {
  ICollectible,
  IEditCampaign,
  IEditLeadStage,
} from "@/interfaces/EditCampaignInterfaces";
import { FirestoreDB } from "@/utils/firestore";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import CreateCampaign from "../create";

const EditCampaign = () => {
  const { pageID } = useLocalSearchParams<{ pageID: string }>();
  const [campaignData, setCampaignData] = useState<IEditCampaign | null>(null);
  const { currentOrganization } = useOrganizationContext();

  const getCampaigns = async () => {
    if (!currentOrganization?.id || !pageID) {
      console.error("Organization ID or Page ID is missing");
      return;
    }

    try {
      // Fetch campaign data
      const campaignsRef = doc(
        FirestoreDB,
        `/organizations/${currentOrganization.id}/campaigns/${pageID}`
      );
      const campaignsSnapshot = await getDoc(campaignsRef);

      if (!campaignsSnapshot.exists()) {
        console.error("No campaign found");
        return;
      }

      const campaignsData: IEditCampaign = {
        ...(campaignsSnapshot.data() as Omit<IEditCampaign, "id">),
        id: campaignsSnapshot.id,
        leadStages: [],
      };

      // Fetch lead stages
      const leadStageRef = collection(
        FirestoreDB,
        `/organizations/${currentOrganization.id}/campaigns/${pageID}/leadStages`
      );
      const leadStageSnapshot = await getDocs(leadStageRef);

      const leadStageData: IEditLeadStage[] = leadStageSnapshot.docs.map(
        (doc) => ({
          ...(doc.data() as Omit<IEditLeadStage, "id" | "collectibles">),
          id: doc.id,
          collectibles: [], // Placeholder for collectibles, fetched next
        })
      );

      // Fetch collectibles for each lead stage
      for (const leadStage of leadStageData) {
        const collectiblesRef = collection(
          FirestoreDB,
          `/organizations/${currentOrganization.id}/campaigns/${pageID}/leadStages/${leadStage.id}/collectibles`
        );

        const collectiblesSnapshot = await getDocs(collectiblesRef);
        leadStage.collectibles = collectiblesSnapshot.docs.map(
          (doc) => doc.data() as ICollectible
        );
      }

      campaignsData.leadStages = leadStageData;

      // Set the final campaign data
      setCampaignData(campaignsData);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, [currentOrganization, pageID]);

  if (!campaignData) {
    return null;
  }

  return <CreateCampaign campaignData={campaignData} />;
};

export default EditCampaign;
