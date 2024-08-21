import { useState } from "react";
import { Platform, View } from "react-native";

import AppLayout from "@/layouts/app-layout";
import CampaignsBoardWeb from "@/components/campaigns-open-view/CampaignsBoard.web";
import CampaignsListWeb from "@/components/campaigns-open-view/CampaignsList.web";
import CampaignsList from "@/components/campaigns-open-view/CampaignsList";
import CampaignsBoard from "@/components/campaigns-open-view/CampaignsBoard";
import { Appbar } from "react-native-paper";
import { DrawerToggle } from "@/components/ui";

enum TabView {
  CAMPAIGNS_BOARD_VIEW = 0,
  CAMPAIGNS_LIST_VIEW = 1,
}

const CampaignsOpenViewScreen: React.FC = () => {
  const [tabView, setTabView] = useState<TabView>(TabView.CAMPAIGNS_BOARD_VIEW);

  const isWeb = Platform.OS === "web";

  return (
    <AppLayout>
      <Appbar.Header>
        {<DrawerToggle />}
        <Appbar.Content title="Campaigns Open view" />
        <Appbar.Action icon="plus" />
      </Appbar.Header>
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

export default CampaignsOpenViewScreen;
