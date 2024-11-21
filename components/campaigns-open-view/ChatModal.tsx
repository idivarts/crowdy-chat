import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import { IConversationUnit } from "@/types/CampaignsBoard";
import { Modal, Portal } from "react-native-paper";
import { View } from "../Themed";

interface IProps {
  igsid: string;
  campaignId: string;
  conversation: IConversationUnit;
  onCloseModal: () => void;
}
const ChatModal: React.FC<IProps> = (props: IProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Handle modal opening logic
    // You can perform any action when the component is mounted
  }, []);

  const handleCloseModal = () => {
    setIsOpen(false);
    props.onCloseModal();
    // Additional logic on modal close
  };

  if (!props.conversation) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={handleCloseModal}
        style={{
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10000,
        }}
        contentContainerStyle={{
          marginTop: 24,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ChatWindow handleCloseModal={handleCloseModal} {...props} />
        </View>
      </Modal>
    </Portal>
  );
};

export default ChatModal;
