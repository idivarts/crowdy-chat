import React from "react";
import { Portal, Modal, IconButton } from "react-native-paper";
import { Text, View } from "./Themed";
import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import Button from "./ui/button/Button";

export interface IConfirmationModalProps {
  actionButtonLabel?: string;
  visible?: boolean;
  message: string;
  handleSubmit: () => void;
  handleCancel?: () => void;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = (props) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={props.visible || false}
        onDismiss={props.handleCancel}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: Colors(theme).background,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              padding: 20,
              backgroundColor: Colors(theme).background,
              width: 300,
            }}
          >
            <IconButton
              icon="close"
              onPress={props.handleCancel}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                marginVertical: 10,
                paddingVertical: 20,
                color: Colors(theme).text,
              }}
            >
              {props.message}
            </Text>
            <Button
              mode="contained"
              style={{ marginBottom: 15 }}
              onPress={props.handleSubmit}
            >
              {props.actionButtonLabel || "Proceed"}
            </Button>
            <Button mode="outlined" onPress={props.handleCancel}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ConfirmationModal;
