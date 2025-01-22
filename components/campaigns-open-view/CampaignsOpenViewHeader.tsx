import Colors from "@/constants/Colors";
import stylesFn from "@/styles/campaigns/CampaignsOpenViewHeader.styles";
import { TabView } from "@/types/CampaignsBoard";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { Platform, Pressable } from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import { View } from "../Themed";
import Button from "../ui/button/Button";
import TextInput from "../ui/text-input/TextInput";
import CampaignsOpenViewFilter from "./CampaignsOpenViewFilter";

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
        marginTop: Platform.OS === "web" ? 0 : 10,
      }}
    >
      <Pressable key={0} onPress={() => router.navigate("/campaigns")}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="arrow-left"
            onPress={() => router.navigate("/campaigns")}
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
                containerStyle={{
                  flex: 1,
                }}
                label="Search Campaigns"
                mode="outlined"
                outlineStyle={{
                  borderColor: Colors(theme).border,
                }}
                style={[
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
