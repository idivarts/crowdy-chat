import { TabView } from "./CampaignOpenView";
import React from "react";
import { Appbar, Button, IconButton, TextInput } from "react-native-paper";
import GoBackButton from "../ui/go-back-button";
import CampaignsOpenViewFilter from "./CampaignsOpenViewFilter";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/campaigns/CampaignsOpenViewHeader.styles";
import { View } from "../Themed";
import { Platform } from "react-native";

interface CampaignsOpenViewHeaderProps {
  tabView: TabView;
  campaignId: string | string[];
  setTabView: React.Dispatch<React.SetStateAction<TabView>>;
  refreshConversations: () => void;
  refreshIncrement: () => void;
}

const CampaignsOpenViewHeader: React.FC<CampaignsOpenViewHeaderProps> = ({
  tabView,
  campaignId,
  setTabView,
  refreshConversations,
  refreshIncrement,
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <Appbar.Header statusBarHeight={0}>
      <GoBackButton />

      <View style={styles.container}>
        {Platform.OS === "web" && (
          <View style={styles.tabButtonsContainer}>
            <Button
              mode={
                tabView === TabView.CAMPAIGNS_BOARD_VIEW
                  ? "contained"
                  : "elevated"
              }
              onPress={() => setTabView(TabView.CAMPAIGNS_BOARD_VIEW)}
              style={styles.button}
            >
              Board
            </Button>
            <Button
              mode={
                tabView === TabView.CAMPAIGNS_LIST_VIEW
                  ? "contained"
                  : "elevated"
              }
              onPress={() => setTabView(TabView.CAMPAIGNS_LIST_VIEW)}
              style={styles.button}
            >
              List
            </Button>
            <View style={styles.searchContainer}>
              <TextInput
                label="Search Campaigns"
                mode="outlined"
                style={styles.searchInput}
              />
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            style={{
              marginTop: 15,
              zIndex: 1,
            }}
            icon="refresh"
            onPress={() => {
              refreshIncrement();
              refreshConversations();
            }}
          />
          <CampaignsOpenViewFilter campaignId={campaignId} />
        </View>
      </View>
    </Appbar.Header>
  );
};

export default CampaignsOpenViewHeader;
