import { useState } from "react";
import { Platform } from "react-native";

import AppLayout from "@/layouts/app-layout";
import CampaignsBoardWeb from "@/components/campaigns-open-view/CampaignsBoard.web";
import CampaignsListWeb from "@/components/campaigns-open-view/CampaignsList.web";
import CampaignsList from "@/components/campaigns-open-view/CampaignsList";
import CampaignsBoard from "@/components/campaigns-open-view/CampaignsBoard";
import Header from "@/layouts/header";
import CampaignsOpenViewHeader from "@/components/campaigns-open-view/CampaignsOpenViewHeader";

export enum TabView {
  CAMPAIGNS_BOARD_VIEW = "Board",
  CAMPAIGNS_LIST_VIEW = "List",
}

const CampaignsOpenView: React.FC = () => {
  const [tabView, setTabView] = useState<TabView>(TabView.CAMPAIGNS_BOARD_VIEW);

  const isWeb = Platform.OS === "web";

  return (
    <AppLayout>
      <Header />
      <CampaignsOpenViewHeader
        tabView={tabView}
        setTabView={setTabView}
      />
      {
        tabView === TabView.CAMPAIGNS_BOARD_VIEW && (
          isWeb ? <CampaignsBoardWeb /> : <CampaignsBoard />
        )
      }
      {
        tabView === TabView.CAMPAIGNS_LIST_VIEW && (
          isWeb ? <CampaignsListWeb /> : <CampaignsList />
        )
      }
    </AppLayout>
  );
};

export default CampaignsOpenView;
