import React from "react";
import { Text, View } from "react-native";
import { Button, Portal, Modal, Icon, IconButton } from "react-native-paper";

export interface IConfirmationModalProps {
  visible: boolean;
  message: string;
  handleSubmit: () => void;
  handleCancel: () => void;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = (props) => {
  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.handleCancel}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              padding: 20,
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
              }}
            >
              {props.message}
            </Text>
            <Button
              mode="contained"
              style={{ marginBottom: 15 }}
              onPress={props.handleSubmit}
            >
              Proceed
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
