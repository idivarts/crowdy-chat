import { TabView } from "./CampaignOpenView";
import React from "react";
import { View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import GoBackButton from "../ui/go-back-button";
import CampaignsOpenViewFilter from "./CampaignsOpenViewFilter";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/campaigns/CampaignsOpenViewHeader.styles";

interface CampaignsOpenViewHeaderProps {
  tabView: TabView;
  setTabView: React.Dispatch<React.SetStateAction<TabView>>;
}

const CampaignsOpenViewHeader: React.FC<CampaignsOpenViewHeaderProps> = ({
  tabView,
  setTabView,
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <Appbar.Header statusBarHeight={0}>
      <GoBackButton />
      <View style={styles.container}>
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
              tabView === TabView.CAMPAIGNS_LIST_VIEW ? "contained" : "elevated"
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
        <CampaignsOpenViewFilter />
      </View>
    </Appbar.Header>
  );
};

export default CampaignsOpenViewHeader;
