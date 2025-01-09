import { useEffect, useState } from "react";
import { ActivityIndicator, Appbar, Button } from "react-native-paper";
import { router, useNavigation } from "expo-router";

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
import { DrawerActions, useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/campaigns/CampaignsList.styles";
import Colors from "@/constants/Colors";
import ProfileIcon from "@/components/profile/ProfileIcon";
import ProfileCircle from "@/components/profile/ProfileCircle";
import OrganizationSwitcherMenu from "@/components/org-switcher";
import ScreenHeader from "@/components/screen-header";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CampaignCard from "@/components/campaigns/CampaignCard";

const Campaigns = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const { lg, xl } = useBreakPoints();
  const navigation = useNavigation();

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
      <ScreenHeader
        title="Campaigns"
        rightAction
        leftIcon={!xl ? faBars : null}
        rightActionButton={<ProfileCircle />}
        action={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          {campaigns.length > 0 && (
            <TextInput
              label="Search Campaigns"
              mode="outlined"
              style={{
                backgroundColor: Colors(theme).background,
                flexGrow: 1,
                height: 40,
              }}
              onChangeText={handleSearch}
              value={searchQuery}
            />
          )}
          <Button
            icon="plus"
            mode="contained"
            onPress={() => router.push("/campaigns/create")}
            style={{ height: 42, marginTop: 4, borderRadius: 4 }}
          >
            {/* Create a Campaign */}
            {Platform.OS === "web" ? (
              <Text>Create a Campaign</Text>
            ) : (
              <Text>Create</Text>
            )}
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
                data={filteredCampaigns}
                renderItem={({ item }) => <CampaignCard item={item} />}
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
