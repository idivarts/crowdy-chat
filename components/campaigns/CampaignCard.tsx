import { Image, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "@/styles/campaigns/CampaignCard.styles";
import Menu from "../ui/menu/Menu";
import MenuTrigger from "../ui/menu/MenuTrigger";
import MenuOptions from "../ui/menu/MenuOptions";
import MenuOption from "../ui/menu/MenuOption";

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
}: CampaignCardProps) => (
  <View style={styles.cardContainer}>
    <View style={styles.cardHeader}>
      <Image source={{ uri: item.image }} style={styles.campaignImage} />
      <View style={styles.cardHeaderContainer}>
        <View style={styles.cardHeaderText}>
          <Text style={styles.campaignName}>{item.name}</Text>
          <View style={styles.chatAssistantIdContainer}>
            <Text style={styles.chatAssistantId}>{item.chatAssistantId}</Text>
            <TouchableOpacity onPress={() => {/* Copy ID functionality */}}>
              <Ionicons name="copy-outline" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Menu>
          <MenuTrigger>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => { console.log('Hello 1') }}>
              <Text>Edit</Text>
            </MenuOption>
            <MenuOption onSelect={() => { console.log('Hello 2') }}>
              <Text>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
    <View style={styles.cardBody}>
      <View style={styles.analyticsCard}>
        <Text>Total Leads: </Text>
        <Text>{item.totalLeads}</Text>
      </View>
      <View style={styles.analyticsCard}>
        <Text>Total Conversions: </Text>
        <Text>{item.totalConversions}</Text>
      </View>
      <View style={styles.analyticsCard}>
        <Text>Total Pages/Sources: </Text>
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

export default CampaignCard;
