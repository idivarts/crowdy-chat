import { Image, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "@/styles/campaigns/CampaignCard.styles";
import DropdownButton from "@/shared-uis/components/dropdown/DropdownButton";
import DropdownOptions from "@/shared-uis/components/dropdown/DropdownOptions";
import DropdownOption from "@/shared-uis/components/dropdown/DropdownOption";
import DropdownTrigger from "@/shared-uis/components/dropdown/DropdownTrigger";
import Dropdown from "@/shared-uis/components/dropdown/Dropdown";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { useBreakPoints } from "@/hooks";

type Campaign = {
  chatAssistantId: string;
  id: string;
  image: string;
  name: string;
  totalConversions: number;
  totalLeads: number;
  totalPages: number;
}

interface CampaignCardProps {
  item: Campaign;
}

const CampaignCard = ({
  item,
}: CampaignCardProps) => {
  const { xl } = useBreakPoints();

  const copyToClipboard = (textToCopy: string) => {
    // Clipboard.setString(textToCopy);
    console.log('Copied to clipboard:', textToCopy);
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
          <Dropdown>
            <DropdownTrigger>
              <MaterialIcons name="more-vert" size={24} color="black" />
            </DropdownTrigger>
            <DropdownOptions>
              <DropdownOption onSelect={() => { console.log('Edit') }}>
                <DropdownButton
                  onPress={() => null}
                  title="Edit"
                />
              </DropdownOption>
              <DropdownOption onSelect={() => { console.log('Delete') }}>
                <DropdownButton
                  onPress={() => null}
                  title="Delete"
                />
              </DropdownOption>
            </DropdownOptions>
          </Dropdown>
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
        <TouchableOpacity style={styles.campaignBoardButton}>
          <Text style={styles.campaignBoardButtonText}>Open Campaign Board</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CampaignCard;
