import { useState } from "react";
import { Platform, View } from "react-native";

import AppLayout from "@/layouts/app-layout";
import CampaignsBoardWeb from "@/components/campaigns-open-view/CampaignsBoard.web";
import CampaignsListWeb from "@/components/campaigns-open-view/CampaignsList.web";
import CampaignsList from "@/components/campaigns-open-view/CampaignsList";
import CampaignsBoard from "@/components/campaigns-open-view/CampaignsBoard";
import Header from "@/layouts/header";
import CampaignsOpenViewHeader from "@/components/campaigns-open-view/CampaignsOpenViewHeader";
import CampaignListView from "@/components/campaigns-open-view/Campaign-List";
import { useLocalSearchParams } from "expo-router";

export enum TabView {
  CAMPAIGNS_BOARD_VIEW = "Board",
  CAMPAIGNS_LIST_VIEW = "List",
}

const CampaignsOpenViewScreen: React.FC = () => {
  const [tabView, setTabView] = useState<TabView>(TabView.CAMPAIGNS_LIST_VIEW);
  const { pageID } = useLocalSearchParams();
  const resolvedPageID = Array.isArray(pageID) ? pageID[0] : pageID;
  const isWeb = Platform.OS === "web";
  if (!resolvedPageID) {
    return null;
  }

  return (
    <AppLayout>
      <Header />
      <CampaignsOpenViewHeader tabView={tabView} setTabView={setTabView} />
      {tabView === TabView.CAMPAIGNS_BOARD_VIEW &&
        (isWeb ? <CampaignsBoardWeb /> : <CampaignsBoard />)}
      {tabView === TabView.CAMPAIGNS_LIST_VIEW &&
        (isWeb ? (
          <CampaignListView pageID={resolvedPageID} />
        ) : (
          <CampaignsList />
        ))}
    </AppLayout>
  );
};

export default CampaignsOpenViewScreen;
