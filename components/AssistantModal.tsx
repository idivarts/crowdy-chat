import React, { useState } from "react";
import { View } from "react-native";
import { Modal, Portal, Button, TextInput } from "react-native-paper";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { HttpService } from "@/services/httpService";
import { PageUnit } from "@/interfaces/SourcePageInterfaces";
import { AssistantModalstylesFn } from "@/styles/sources/Modals.styles";
import { useTheme } from "@react-navigation/native";

const AssistantModal: React.FC<{
  page: PageUnit;
  setPage: React.Dispatch<React.SetStateAction<PageUnit>>;
  //   handleCloseModal;
  handleCloseModal: () => void;
}> = (props) => {
  const theme = useTheme();
  const styles = AssistantModalstylesFn(theme);

  const [assistant, setAssistant] = useState({
    assistantId: props.page.assistantId,
    reminderTimeMultiplier: props.page.reminderTimeMultiplier,
    replyTimeMax: props.page.replyTimeMax,
    replyTimeMin: props.page.replyTimeMin,
  });

  const handleSubmit = async () => {
    HttpService.setPageAssistant(props.page.id, assistant)
      .then((res) => {
        Toaster.success("Updated Assistant Successfully");
        props.setPage({ ...props.page, ...assistant });
      })
      .catch((e) => {
        Toaster.error("Error updating Assistant");
      });
    props.handleCloseModal();
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={props.handleCloseModal}
        style={styles.modalContent}
        contentContainerStyle={{
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.boxContainer}>
          <View>
            <TextInput
              label="Assistant ID*"
              value={assistant.assistantId}
              onChangeText={(text) =>
                setAssistant({ ...assistant, assistantId: text })
              }
              style={styles.input}
            />
            <TextInput
              label="Reminder Time Multiplier"
              value={assistant.reminderTimeMultiplier.toString()}
              onChangeText={(text) =>
                setAssistant({
                  ...assistant,
                  reminderTimeMultiplier: parseInt(text),
                })
              }
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Reply Time Min"
              value={assistant.replyTimeMin.toString()}
              onChangeText={(text) =>
                setAssistant({ ...assistant, replyTimeMin: parseInt(text) })
              }
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Reply Time Max"
              value={assistant.replyTimeMax.toString()}
              onChangeText={(text) =>
                setAssistant({ ...assistant, replyTimeMax: parseInt(text) })
              }
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.footer}>
            <Button
              mode="outlined"
              onPress={props.handleCloseModal}
              style={styles.button}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              Submit
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default AssistantModal;
