import React from "react";
import { View, Text, TextInput } from "react-native";
import { CreateCampaignstyles as styles } from "@/styles/Dashboard.styles";
import { ToastContainer } from "react-toastify";

export const CampaignStepTwo = (
  prescript: string,
  setPrescript: (newPrescript: string) => void,
  campaignPurpose: string,
  setCampaignPurpose: (newCampaignPurpose: string) => void,
  actorDefinition: string,
  setActorDefinition: (newActorDefinition: string) => void,
  dialogues: string,
  setDialogues: (newDialogues: string) => void
) => (
  <View style={styles.stepContainer}>
    <ToastContainer />
    <Text>Prescript</Text>
    <TextInput
      style={styles.textArea}
      value={prescript}
      onChangeText={setPrescript}
      multiline
    />

    <Text>Purpose of the Campaign</Text>
    <TextInput
      style={styles.textArea}
      value={campaignPurpose}
      onChangeText={setCampaignPurpose}
      multiline
    />

    <Text>Actor Definition</Text>
    <TextInput
      style={styles.textArea}
      value={actorDefinition}
      onChangeText={setActorDefinition}
      multiline
    />

    <Text>Dialogues and Examples</Text>
    <TextInput
      style={styles.textArea}
      value={dialogues}
      onChangeText={setDialogues}
      multiline
    />
  </View>
);
