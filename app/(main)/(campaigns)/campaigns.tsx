import { useState } from "react";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";

import AppLayout from "@/layouts/app-layout";
import { View } from "@/components/Themed";
import { campaigns as initialCampaigns } from "@/constants/Campaigns";
import styles from "@/styles/campaigns/CampaignsList.styles";
import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import CampaignsEmptyState from "@/components/campaigns/CampaignsEmptyState";
import CampaignsFilledState from "@/components/campaigns/CampaignsFilledState";
// import TextInput from "@/components/ui/text-input/TextInput";
import { TextInput } from "react-native-paper";

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState(initialCampaigns);
  const { lg } = useBreakPoints();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredCampaigns(initialCampaigns);
    } else {
      const filtered = initialCampaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCampaigns(filtered);
    }
  };

  return (
    <AppLayout>
      <Appbar.Header>
        {!lg && <DrawerToggle />}
        <Appbar.Content title="Campaigns" />
        <Appbar.Action icon="plus" onPress={() => router.push("/campaigns/create")} />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          label="Search Campaigns"
          mode="outlined"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <View style={styles.campaignsSection}>
          {filteredCampaigns.length > 0
            ? <CampaignsFilledState campaigns={filteredCampaigns} />
            : <CampaignsEmptyState />}
        </View>
      </View>
    </AppLayout>
  );
};

export default Campaigns;
