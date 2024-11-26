import { TabView } from "./CampaignOpenView";
import React from "react";
import { Appbar, Button, IconButton, TextInput } from "react-native-paper";
import GoBackButton from "../ui/go-back-button";
import CampaignsOpenViewFilter from "./CampaignsOpenViewFilter";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/campaigns/CampaignsOpenViewHeader.styles";
import { View } from "../Themed";
import { Platform, Pressable } from "react-native";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

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
    <Appbar.Header
      statusBarHeight={0}
      style={{
        backgroundColor: Colors(theme).background,
      }}
    >
      <Pressable
        key={0}
        onPress={() => router.navigate("/(campaigns)/campaigns")}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="arrow-left"
            onPress={() => router.navigate("/(campaigns)/campaigns")}
          />
        </View>
      </Pressable>

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
                outlineStyle={{
                  borderColor: Colors(theme).border,
                }}
                style={[
                  styles.searchInput,
                  {
                    textAlignVertical: "center",
                    marginBottom: 6,
                    color: Colors(theme).text,
                  },
                ]}
                contentStyle={{
                  color: Colors(theme).text,
                }}
              />
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <CampaignsOpenViewFilter campaignId={campaignId} />
          <IconButton
            style={{
              zIndex: 1,
            }}
            icon="refresh"
            onPress={() => {
              refreshIncrement();
              refreshConversations();
            }}
          />
        </View>
      </View>
    </Appbar.Header>
  );
};

export default CampaignsOpenViewHeader;
