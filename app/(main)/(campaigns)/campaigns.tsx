import AppLayout from "@/layouts/app-layout";
import { Text, View } from "@/components/Themed";
import { Button, Image, TouchableOpacity } from "react-native";
import { Link, router, useRouter } from "expo-router";
import { useState } from "react";
import { campaigns as initialCampaigns } from "@/constants/Campaigns";
import CreateCampaign from "@/components/modals/CampaignCreate";
import CampaignCard from "@/components/campaigns/CampaignCard";
import SearchInput from "@/shared-uis/components/search-input/SearchInput";
import styles from "@/styles/campaigns/CampaignsList.styles";

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState(initialCampaigns);

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

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image
        source={{ uri: "https://via.placeholder.com/300" }}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>No Campaigns yet</Text>
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Campaign</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFilledState = () => (
    <View style={styles.filledStateContainer}>
      {filteredCampaigns.map((campaign) => (
        <CampaignCard key={campaign.id} item={campaign} />
      ))}
    </View>
  );

  return (
    <AppLayout>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <SearchInput
            placeholder="Search Campaigns"
            value={searchQuery}
            onChangeText={handleSearch}
            style={{ flex: 1, marginRight: 10 }}
          />
          {/* <CreateCampaign /> */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push("/campaigns/create")}
          >
            <Text style={styles.createButtonText}>Create Campaign</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.campaignsSection}>
          {filteredCampaigns.length > 0
            ? renderFilledState()
            : renderEmptyState()}
        </View>
      </View>
    </AppLayout>
  );
};

export default Campaigns;
