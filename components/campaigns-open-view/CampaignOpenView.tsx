import { useEffect, useState } from "react";
import { Platform } from "react-native";
import AppLayout from "@/layouts/app-layout";
import CampaignsBoardWeb from "@/components/campaigns-open-view/CampaignsBoard.web";
import CampaignsBoard from "@/components/campaigns-open-view/CampaignsBoard";
import Header from "@/layouts/header";
import CampaignsOpenViewHeader from "@/components/campaigns-open-view/CampaignsOpenViewHeader";
import CampaignListView from "./Campaign-List";
import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { useOrganizationContext } from "@/contexts";
import Toast from "react-native-toast-message";

export enum TabView {
  CAMPAIGNS_BOARD_VIEW = "Board",
  CAMPAIGNS_LIST_VIEW = "List",
}

const CampaignsOpenView: React.FC = () => {
  // const [tabView, setTabView] = useState<TabView>(TabView.CAMPAIGNS_BOARD_VIEW);
  const [tabView, setTabView] = useState<TabView>(
    Platform.OS === "web"
      ? TabView.CAMPAIGNS_BOARD_VIEW
      : TabView.CAMPAIGNS_LIST_VIEW
  );

  const [allConversation, setAllConversation] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const { currentOrganization } = useOrganizationContext();
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const isWeb = Platform.OS === "web";

  const { pageID, campaignId } = useLocalSearchParams();

  const getAllConversations = async () => {
    if (!campaignId) return;

    if (!currentOrganization) return;

    try {
      const conversationRef = collection(
        FirestoreDB,
        "organizations",
        currentOrganization?.id,
        "campaigns",
        campaignId as string,
        "conversations"
      );

      const dataQuery = query(conversationRef, where("status", "<=", 15));

      const data = await getDocs(dataQuery);

      var res = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      const leadRef = collection(
        FirestoreDB,
        "organizations",
        currentOrganization?.id,
        "leads"
      );

      const leadData = await getDocs(leadRef);

      res = res.map((result: any) => {
        const lead = leadData.docs.find(
          (doc) => doc.data().id === result.leadId
        );

        return {
          ...result,
          user: lead ? lead.data() : null,
        };
      });

      if (pageID) {
        res = res.filter((result: any) => {
          return result.sourceId === pageID;
        });
      }

      setAllConversation(res);

      return res;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <AppLayout>
      <Header />
      <Toast />
      <CampaignsOpenViewHeader
        tabView={tabView}
        setTabView={setTabView}
        refreshConversations={getAllConversations}
        campaignId={campaignId}
        refreshIncrement={() => setRefreshKey(refreshKey + 1)}
      />
      {tabView === TabView.CAMPAIGNS_BOARD_VIEW &&
        (isWeb ? (
          <CampaignsBoardWeb
            getAllConversations={getAllConversations}
            conversations={allConversation}
            refreshKey={refreshKey}
          />
        ) : (
          <CampaignsBoard />
        ))}
      {tabView === TabView.CAMPAIGNS_LIST_VIEW && (
        <CampaignListView
          pageId={pageID as string}
          getAllConversations={getAllConversations}
          conversations={allConversation}
          refreshKey={refreshKey}
        />
      )}
    </AppLayout>
  );
};

export default CampaignsOpenView;
