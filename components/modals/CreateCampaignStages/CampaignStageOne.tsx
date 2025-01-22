import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import { Platform } from "react-native";
import { CreateCampaignstylesFn } from "@/styles/Dashboard.styles";
import { TextModal } from "../TextInputModal/TextModal.web";
import { router, useLocalSearchParams } from "expo-router";
import { handleModalOrInputPage } from "@/helpers/TextInput";
import TextInput from "@/components/ui/text-input/TextInput";
import { IconButton } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useBreakPoints } from "@/hooks";

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
  const isWeb = Platform.OS === "web";

  const { lg } = useBreakPoints();

  const value = useLocalSearchParams().value;

  useEffect(() => {
    if (value) {
      const { textbox } = JSON.parse(value as string);
      const { title, value: textBoxValue } = textbox;
      setCampaignObjective(textBoxValue);
    }
  }, [value]);

  return (
    <View
      style={{
        width: lg ? 480 : "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.stepContainer}>
        <TextInput
          value={campaignName}
          onChangeText={setCampaignName}
          label={"Campaign Name"}
        />
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
            value={campaignObjective}
            multiline
            numberOfLines={6}
            label={"Campaign Objective"}
            onChangeText={setCampaignObjective}
          />
          <IconButton
            onPress={() => {
              handleModalOrInputPage({
                isWeb,
                openModal: (title, placeholder, value, onSubmit) => {
                  setOpenModal(true);
                },
                router,
                fieldTitle: "Campaign Objective",
                fieldValue: campaignObjective,
                setFieldValue: setCampaignObjective,
                pathBack: "/campaigns/create",
              });
            }}
            style={{
              position: "absolute",
              right: 0,
              top: 10,
            }}
            icon={() =>
              <FontAwesomeIcon
                icon={faPencil}
                size={22}
                color={theme.dark ? "white" : "black"}
              />
            }
          />
        </View>
        <View
          style={{
            gap: 6,
            width: "100%",
          }}
        >
          <Text>Reply Speed</Text>
          <View style={styles.rowCampaignOne}>
            <TextInput
              containerStyle={{
                flex: 1,
              }}
              placeholder="Min"
              keyboardType="numeric"
              value={replySpeed.min}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setReplySpeed({ ...replySpeed, min: numericValue });
              }}
            />
            <TextInput
              containerStyle={{
                flex: 1,
              }}
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
        <View
          style={{
            gap: 6,
            width: "100%",
          }}
        >
          <Text>Reminder Timing</Text>
          <View style={styles.rowCampaignOne}>
            <TextInput
              containerStyle={{
                flex: 1,
              }}
              placeholder="Min"
              keyboardType="numeric"
              value={reminderTiming.min}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setReminderTiming({ ...reminderTiming, min: numericValue });
              }}
            />
            <TextInput
              containerStyle={{
                flex: 1,
              }}
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
    </View >
  );
};

export { CampaignStepOne };
