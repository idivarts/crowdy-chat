import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { CreateCampaignstylesFn } from "@/styles/Dashboard.styles";
import { useTheme } from "@react-navigation/native";

export const CampaignStepTwo = (
  prescript: string,
  setPrescript: (newPrescript: string) => void,
  campaignPurpose: string,
  setCampaignPurpose: (newCampaignPurpose: string) => void,
  actorDefinition: string,
  setActorDefinition: (newActorDefinition: string) => void,
  dialogues: string,
  setDialogues: (newDialogues: string) => void
) => {
  const theme = useTheme();
  const styles = CreateCampaignstylesFn(theme);

  return (
    <View
      style={{
        width: "80%",
      }}
    >
      <View style={styles.stepContainer2}>
        <Text>Prescript</Text>
        <TextInput
          // style={styles.textArea}
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
    </View>
  );
};