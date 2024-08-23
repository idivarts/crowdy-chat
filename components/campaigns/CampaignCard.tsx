import { Image, Pressable, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "@/styles/campaigns/CampaignCard.styles";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { useBreakPoints } from "@/hooks";
import * as Clipboard from 'expo-clipboard';
import Button from "../ui/button/Button";
import { Campaign } from "@/types/campaign";
import MenuItem from "../ui/menu/MenuItem";
import Menu from "../ui/menu/Menu";
import { useState } from "react";

interface CampaignCardProps {
  item: Campaign;
};

const CampaignCard = ({
  item,
}: CampaignCardProps) => {
  const { xl } = useBreakPoints();
  const [menuVisible, setMenuVisible] = useState(false);

  const copyToClipboard = (textToCopy: string) => {
    Clipboard.setStringAsync(textToCopy);
    Toaster.success('Copied to clipboard!');
  };

  return (
    <View
      style={[
        styles.cardContainer,
        {
          width: xl ? '49%' : '100%',
        }
      ]}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.image }} style={styles.campaignImage} />
        <View style={styles.cardHeaderContainer}>
          <View style={styles.cardHeaderText}>
            <Text style={styles.campaignName}>{item.name}</Text>
            <View style={styles.chatAssistantIdContainer}>
              <Text style={styles.chatAssistantId}>{item.chatAssistantId}</Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(item.chatAssistantId)}
                style={styles.copyIdIcon}
              >
                <Ionicons name="copy-outline" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <Menu
            visible={menuVisible}
            onDismiss={() => {
              setMenuVisible(false);
            }}
            anchor={
              <Pressable onPress={() => setMenuVisible(true)}>
                <MaterialIcons name="more-vert" size={24} color="black" />
              </Pressable>
            }
          >
            <>
              <MenuItem
                key="edit"
                onPress={() => { console.log('Edit') }}
                title="Edit"
              />
              <MenuItem
                key="delete"
                onPress={() => { console.log('Delete') }}
                title="Delete"
              />
            </>
          </Menu>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsCardTitle}>Total Leads: </Text>
          <Text>{item.totalLeads}</Text>
        </View>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsCardTitle}>Total Conversions: </Text>
          <Text>{item.totalConversions}</Text>
        </View>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsCardTitle}>Total Pages/Sources: </Text>
          <Text>{item.totalPages}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Button
          mode="contained"
          onPress={() => { console.log('Open Campaign Board') }}
        >
          Open Campaign Board
        </Button>
      </View>
    </View>
  );
};

export default CampaignCard;
