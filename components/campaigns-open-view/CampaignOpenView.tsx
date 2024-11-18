import { useEffect, useState } from "react";
import { Platform } from "react-native";

import AppLayout from "@/layouts/app-layout";
import CampaignsBoardWeb from "@/components/campaigns-open-view/CampaignsBoard.web";
import CampaignsListWeb from "@/components/campaigns-open-view/CampaignsList.web";
import CampaignsList from "@/components/campaigns-open-view/CampaignsList";
import CampaignsBoard from "@/components/campaigns-open-view/CampaignsBoard";
import Header from "@/layouts/header";
import CampaignsOpenViewHeader from "@/components/campaigns-open-view/CampaignsOpenViewHeader";
import CampaignListView from "./Campaign-List";
import { useLocalSearchParams } from "expo-router";
import { ConversationService } from "@/services";

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

  const isWeb = Platform.OS === "web";
  const { pageId } = useLocalSearchParams();
  const PID: any = pageId;

  const getAllConversations = async () => {
    try {
      const res = await ConversationService.getConversations({
        pageId: pageId as string,
      });
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
      <CampaignsOpenViewHeader
        tabView={tabView}
        setTabView={setTabView}
        refreshConversations={getAllConversations}
      />
      {tabView === TabView.CAMPAIGNS_BOARD_VIEW &&
        (isWeb ? (
          <CampaignsBoardWeb
            getAllConversations={getAllConversations}
            conversations={allConversation}
          />
        ) : (
          <CampaignsBoard />
        ))}
      {tabView === TabView.CAMPAIGNS_LIST_VIEW && (
        <CampaignListView
          pageId={PID}
          getAllConversations={getAllConversations}
          conversations={allConversation}
        />
      )}
    </AppLayout>
  );
};

export default CampaignsOpenView;
