import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { CreateCampaignstylesFn } from "@/styles/Dashboard.styles";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import { Platform, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextModal } from "../TextInputModal/TextModal.web";
import { router, useLocalSearchParams } from "expo-router";
import { handleModalOrInputPage } from "@/helpers/TextInput";

interface CampaignStepTwoProps {
  prescript: string;
  setPrescript: (newPrescript: string) => void;
  campaignPurpose: string;
  setCampaignPurpose: (newCampaignPurpose: string) => void;
  actorDefinition: string;
  setActorDefinition: (newActorDefinition: string) => void;
  dialogues: string;
  setDialogues: (newDialogues: string) => void;
}

const CampaignStepTwo: React.FC<CampaignStepTwoProps> = ({
  prescript,
  setPrescript,
  campaignPurpose,
  setCampaignPurpose,
  actorDefinition,
  setActorDefinition,
  dialogues,
  setDialogues,
}) => {
  const theme = useTheme();
  const styles = CreateCampaignstylesFn(theme);

  // States for modals
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    placeholder: "",
    value: "",
    onSubmit: (value: string) => {},
  });

  const openModal = (
    title: string,
    placeholder: string,
    value: string,
    onSubmit: (value: string) => void
  ) => {
    setModalData({ isOpen: true, title, placeholder, value, onSubmit });
  };

  const navigateToEditPage = (
    title: string,
    value: string,
    setValue: (value: string) => void
  ) => {
    router.push({
      pathname: "/(main)/(screens)/(campaigns)/textbox-page",
      params: {
        title,
        value,
        path: "/(main)/(screens)/(campaigns)/campaigns", // Path to navigate back
      },
    });
  };

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  const value = useLocalSearchParams().value;

  useEffect(() => {
    if (value) {
      const { textbox } = JSON.parse(value as string);
      const { title, value: textBoxValue } = textbox;

      switch (title) {
        case "Edit Prescript":
          setPrescript(textBoxValue);
          break;
        case "Edit Campaign Purpose":
          setCampaignPurpose(textBoxValue);
          break;
        case "Edit Actor Definition":
          setActorDefinition(textBoxValue);
          break;
        case "Edit Dialogues":
          setDialogues(textBoxValue);
          break;
      }
    }
  }, [value]);

  return (
    <View style={{ width: "80%" }}>
      <View style={styles.stepContainer2}>
        {/* Prescript Field */}
        <View style={styles.inputWrapper}>
          <Text>Prescript</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textArea}
              value={prescript}
              onChangeText={setPrescript}
              multiline
            />
            <Pressable
              onPress={() =>
                handleModalOrInputPage({
                  isWeb: Platform.OS === "web",
                  openModal,
                  router,
                  fieldTitle: "Edit Prescript",
                  fieldValue: prescript,
                  setFieldValue: setPrescript,
                  pathBack: "/campaigns/create",
                })
              }
              style={styles.editIcon}
            >
              <Ionicons name="pencil" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        {/* Campaign Purpose Field */}
        <View style={styles.inputWrapper}>
          <Text>Purpose of the Campaign</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textArea}
              value={campaignPurpose}
              onChangeText={setCampaignPurpose}
              multiline
            />
            <Pressable
              onPress={() =>
                handleModalOrInputPage({
                  isWeb: Platform.OS === "web",
                  openModal,
                  router,
                  fieldTitle: "Edit Campaign Purpose",
                  fieldValue: campaignPurpose,
                  setFieldValue: setCampaignPurpose,
                  pathBack: "/campaigns/create",
                })
              }
              style={styles.editIcon}
            >
              <Ionicons name="pencil" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        {/* Actor Definition Field */}
        <View style={styles.inputWrapper}>
          <Text>Actor Definition</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textArea}
              value={actorDefinition}
              onChangeText={setActorDefinition}
              multiline
            />
            <Pressable
              onPress={() =>
                handleModalOrInputPage({
                  isWeb: Platform.OS === "web",
                  openModal,
                  router,
                  fieldTitle: "Edit Actor Definition",
                  fieldValue: actorDefinition,
                  setFieldValue: setActorDefinition,
                  pathBack: "/campaigns/create",
                })
              }
              style={styles.editIcon}
            >
              <Ionicons name="pencil" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        {/* Dialogues Field */}
        <View style={styles.inputWrapper}>
          <Text>Dialogues and Examples</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textArea}
              value={dialogues}
              onChangeText={setDialogues}
              multiline
            />
            <Pressable
              onPress={() =>
                handleModalOrInputPage({
                  isWeb: Platform.OS === "web",
                  openModal,
                  router,
                  fieldTitle: "Edit Dialogues",
                  fieldValue: dialogues,
                  setFieldValue: setDialogues,
                  pathBack: "/campaigns/create",
                })
              }
              style={styles.editIcon}
            >
              <Ionicons name="pencil" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Modal Component */}
      <TextModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        placeholder={modalData.placeholder}
        value={modalData.value}
        onSubmit={(value) => {
          modalData.onSubmit(value);
          closeModal();
        }}
      />
    </View>
  );
};

export { CampaignStepTwo };
