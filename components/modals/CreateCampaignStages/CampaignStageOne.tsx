import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import { Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CreateCampaignstylesFn } from "@/styles/Dashboard.styles";
import { TextModal } from "../TextInputModal/TextModal.web";
import { router, useLocalSearchParams } from "expo-router";

interface CampaignStepOneProps {
  campaignName: string;
  setCampaignName: (newCampaignName: string) => void;
  campaignObjective: string;
  setCampaignObjective: (newCampaignObjective: string) => void;
  replySpeed: { min: string; max: string };
  setReplySpeed: (newReplySpeed: { min: string; max: string }) => void;
  reminderTiming: { min: string; max: string };
  setReminderTiming: (newReminderTiming: { min: string; max: string }) => void;
}

const CampaignStepOne: React.FC<CampaignStepOneProps> = ({
  campaignName,
  setCampaignName,
  campaignObjective,
  setCampaignObjective,
  replySpeed,
  setReplySpeed,
  reminderTiming,
  setReminderTiming,
}) => {
  const theme = useTheme();
  const styles = CreateCampaignstylesFn(theme);
  const [openModal, setOpenModal] = useState(false);

  const value = useLocalSearchParams().value;

  useEffect(() => {
    if (value) {
      const { textBoxValue } = JSON.parse(value as string);
      setCampaignObjective(textBoxValue);
    }
  }, [value]);

  return (
    <View
      style={{
        maxWidth: "50%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.stepContainer}>
        <View>
          <Text>Campaign Name</Text>
          <TextInput
            style={styles.inputcampaign1}
            value={campaignName}
            onChangeText={setCampaignName}
          />
        </View>
        <View>
          <Text>Campaign Objective</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: 10,
              position: "relative",
            }}
          >
            <TextInput
              style={styles.inputcampaign1}
              value={campaignObjective}
              multiline
              numberOfLines={6}
              onChangeText={setCampaignObjective}
            />
            <TouchableOpacity
              onPress={() => {
                Platform.OS === "web"
                  ? setOpenModal(true)
                  : router.navigate({
                      pathname: "/(main)/(screens)/textbox-page",
                      params: {
                        title: "Campaign Objective",
                        value: campaignObjective,
                        path: "/campaigns/create",
                      },
                    });
              }}
              style={{
                position: "absolute",
                right: 0,
                top: 5,
                padding: 10,
              }}
            >
              <Ionicons name="pencil" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>Reply Speed</Text>
          <View style={styles.rowCampaignOne}>
            <TextInput
              style={styles.inputTextcampaign1}
              placeholder="Min"
              keyboardType="numeric"
              value={replySpeed.min}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setReplySpeed({ ...replySpeed, min: numericValue });
              }}
            />
            <TextInput
              style={styles.inputTextcampaign1}
              placeholder="Max"
              keyboardType="numeric"
              value={replySpeed.max}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setReplySpeed({ ...replySpeed, max: numericValue });
              }}
            />
          </View>
        </View>
        <View>
          <Text>Reminder Timing</Text>
          <View style={styles.rowCampaignOne}>
            <TextInput
              style={styles.inputTextcampaign1}
              placeholder="Min"
              keyboardType="numeric"
              value={reminderTiming.min}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setReminderTiming({ ...reminderTiming, min: numericValue });
              }}
            />
            <TextInput
              style={styles.inputTextcampaign1}
              placeholder="Max"
              keyboardType="numeric"
              value={reminderTiming.max}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setReminderTiming({ ...reminderTiming, max: numericValue });
              }}
            />
          </View>
        </View>
      </View>
      <TextModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        value={campaignObjective}
        placeholder="Campaign Objective"
        title="Campaign Objective"
        onSubmit={setCampaignObjective}
      />
    </View>
  );
};

export { CampaignStepOne };
