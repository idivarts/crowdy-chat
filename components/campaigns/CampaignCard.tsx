import React from "react";
import { Image, Pressable, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { useBreakPoints } from "@/hooks";
import * as Clipboard from "expo-clipboard";
import { Campaign } from "@/types/campaign";
import { useRouter } from "expo-router";
import MenuItem from "../ui/menu/MenuItem";
import Menu from "../ui/menu/Menu";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { useCampaignContext } from "@/contexts/campaign-context.provider";
import { Portal } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/campaigns/CampaignCard.styles";
import Colors from "@/constants/Colors";
import { imageUrl } from "@/helpers/imageurl";

interface CampaignCardProps {
  item: Campaign;
}

const CampaignCard = ({ item }: CampaignCardProps) => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const { xl } = useBreakPoints();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const { deleteCampaign } = useCampaignContext();

  const copyToClipboard = (textToCopy: string) => {
    Clipboard.setStringAsync(textToCopy);
    Toaster.success("Copied to clipboard!");
  };

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        {
          width: xl ? "49%" : "100%",
        },
      ]}
      onPress={() => {
        router.push({
          pathname: `/campaign-detailed-view`,
          params: { campaignId: item.id },
        });
      }}
    >
      <View style={styles.cardHeader}>
        <Image source={imageUrl(item.image)} style={styles.campaignImage} />
        <View style={styles.cardHeaderContainer}>
          <View style={styles.cardHeaderText}>
            <Text style={styles.campaignName}>{item.name}</Text>
            <View style={styles.chatAssistantIdContainer}>
              <Text style={styles.chatAssistantId}>{item.assistantId}</Text>
              {item.assistantId && (
                <TouchableOpacity
                  onPress={() => copyToClipboard(item.assistantId || "")}
                  style={styles.copyIdIcon}
                >
                  <Ionicons
                    name="copy-outline"
                    size={16}
                    color={Colors(theme).text}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Menu
            visible={menuVisible}
            onDismiss={() => {
              setMenuVisible(false);
            }}
            anchor={
              <Pressable onPress={() => setMenuVisible(true)}>
                <MaterialIcons
                  name="more-vert"
                  size={24}
                  color={Colors(theme).text}
                />
              </Pressable>
            }
          >
            <>
              <MenuItem
                key="edit"
                onPress={() => {
                  setMenuVisible(false);
                  router.push(`/campaigns/edit/${item.id}`);
                }}
                title="Edit"
                titleStyle={{
                  color: Colors(theme).text,
                }}
                style={{
                  backgroundColor: Colors(theme).background,
                }}
              />
              <MenuItem
                key="delete"
                onPress={() => {
                  setMenuVisible(false);
                  setConfirmationModalVisible(true);
                }}
                title="Delete"
                titleStyle={{
                  color: Colors(theme).text,
                }}
                style={{
                  backgroundColor: Colors(theme).background,
                }}
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
      <Portal>
        <ConfirmationModal
          actionButtonLabel="Delete"
          visible={confirmationModalVisible}
          message="Are you sure you want to delete this campaign?"
          handleSubmit={() => {
            deleteCampaign(item.id);
            setConfirmationModalVisible(false);
          }}
          handleCancel={() => {
            setConfirmationModalVisible(false);
          }}
        />
      </Portal>
    </TouchableOpacity>
  );
};

export default CampaignCard;
