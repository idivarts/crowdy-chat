import { useEffect, useState } from "react";
import { ActivityIndicator, Appbar, Button } from "react-native-paper";
import { router } from "expo-router";

import AppLayout from "@/layouts/app-layout";
import { View } from "@/components/Themed";
import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import EmptyState from "@/components/EmptyState";
import CampaignsFilledState from "@/components/campaigns/CampaignsFilledState";
import { TextInput } from "react-native-paper";
import { useCampaignContext } from "@/contexts/campaign-context.provider";
import { Campaign } from "@/types/campaign";
import { useOrganizationContext } from "@/contexts";
import { FlatList, Platform, Pressable, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/campaigns/CampaignsList.styles";
import Colors from "@/constants/Colors";
import ProfileIcon from "@/components/profile/ProfileIcon";
import ProfileCircle from "@/components/profile/ProfileCircle";
import OrganizationSwitcherMenu from "@/components/org-switcher";

const Campaigns = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const { lg, xl } = useBreakPoints();

  const { campaigns } = useCampaignContext();
  const { currentOrganization } = useOrganizationContext();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredCampaigns(campaigns);
    } else {
      const filtered = campaigns.filter((campaign) =>
        campaign.name
          ? campaign.name.toLowerCase().includes(query.toLowerCase())
          : false
      );
      setFilteredCampaigns(filtered);
    }
  };

  useEffect(() => {
    setFilteredCampaigns(campaigns);
  }, [campaigns]);

  if (!currentOrganization) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!campaigns) {
    return null;
  }

  return (
    <AppLayout>
      <Appbar.Header
        statusBarHeight={0}
        style={{
          backgroundColor: Colors(theme).background,
          gap: 10,
        }}
      >
        {!lg && <DrawerToggle />}
        <Appbar.Content title="Campaigns" />
        <ProfileCircle />
      </Appbar.Header>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {campaigns.length > 0 && (
            <TextInput
              label="Search Campaigns"
              mode="outlined"
              style={{
                backgroundColor: Colors(theme).background,
                flex: 1,
              }}
              onChangeText={handleSearch}
              value={searchQuery}
            />
          )}
          <Button
            icon="plus"
            mode="contained"
            onPress={() => router.push("/campaigns/create")}
          >
            Create a Campaign
          </Button>
        </View>
        {Platform.OS === "web" && (
          <View style={styles.campaignsSection}>
            {filteredCampaigns.length > 0 ? (
              <FlatList
                data={[,]}
                renderItem={({ item }) => (
                  <CampaignsFilledState campaigns={filteredCampaigns} />
                )}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <EmptyState
                image={require("@/assets/images/empty-illusatration.png")}
                message="No campaigns found"
                buttonPresent={true}
                onPress={() => router.push("/campaigns/create")}
                buttonName="Create a Campaign"
              />
            )}
          </View>
        )}
        {Platform.OS !== "web" && (
          <View style={styles.campaignsSection}>
            {filteredCampaigns.length > 0 ? (
              <FlatList
                data={[,]}
                renderItem={({ item }) => (
                  <CampaignsFilledState campaigns={filteredCampaigns} />
                )}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <EmptyState
                image={require("@/assets/images/empty-illusatration.png")}
                message="No campaigns found"
                buttonPresent={true}
                onPress={() => router.push("/campaigns/create")}
                buttonName="Create a Campaign"
              />
            )}
          </View>
        )}
      </View>
    </AppLayout>
  );
};

export default Campaigns;
