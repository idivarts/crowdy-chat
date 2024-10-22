import React from "react";
import { TextInput } from "react-native-paper";
import { CreateCampaignstylesFn } from "@/styles/Dashboard.styles";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";

export const CampaignStepOne = (
  campaignName: string,
  setCampaignName: (newCampaignName: string) => void,
  campaignObjective: string,
  setCampaignObjective: (newCampaignObjective: string) => void,
  replySpeed: { min: string; max: string },
  setReplySpeed: (newReplySpeed: { min: string; max: string }) => void,
  reminderTiming: { min: string; max: string },
  setReminderTiming: (newReminderTiming: { min: string; max: string }) => void
) => {
  const theme = useTheme();
  const styles = CreateCampaignstylesFn(theme);

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
          <TextInput
            style={styles.inputcampaign1}
            value={campaignObjective}
            onChangeText={setCampaignObjective}
          />
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
    </View>
  );
};
