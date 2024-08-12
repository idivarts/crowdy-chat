import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { CreateCampaignstyles as styles } from "@/styles/Dashboard.styles";

export const CampaignStepOne = (
  campaignName: string,
  setCampaignName: (newCampaignName: string) => void,
  campaignObjective: string,
  setCampaignObjective: (newCampaignObjective: string) => void,
  replySpeed: { min: string; max: string },
  setReplySpeed: (newReplySpeed: { min: string; max: string }) => void,
  reminderTiming: { min: string; max: string },
  setReminderTiming: (newReminderTiming: { min: string; max: string }) => void
) => (
  <View
    style={{
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View style={styles.stepContainer}>
      <Text>Campaign Name</Text>
      <TextInput
        style={styles.input}
        value={campaignName}
        onChangeText={setCampaignName}
      />

      <Text>Campaign Objective</Text>
      <TextInput
        style={styles.input}
        value={campaignObjective}
        onChangeText={setCampaignObjective}
      />

      <Text>Reply Speed</Text>
      <View style={styles.rowCampaignOne}>
        <TextInput
          style={styles.input}
          placeholder="Min"
          keyboardType="numeric"
          value={replySpeed.min}
          onChangeText={(text) => setReplySpeed({ ...replySpeed, min: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Max"
          keyboardType="numeric"
          value={replySpeed.max}
          onChangeText={(text) => setReplySpeed({ ...replySpeed, max: text })}
        />
      </View>

      <Text>Reminder Timing</Text>
      <View style={styles.rowCampaignOne}>
        <TextInput
          style={styles.input}
          placeholder="Min"
          keyboardType="numeric"
          value={reminderTiming.min}
          onChangeText={(text) =>
            setReminderTiming({ ...reminderTiming, min: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Max"
          keyboardType="numeric"
          value={reminderTiming.max}
          onChangeText={(text) =>
            setReminderTiming({ ...reminderTiming, max: text })
          }
        />
      </View>
    </View>
  </View>
);
