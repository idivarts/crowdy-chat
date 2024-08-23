import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import { IConversationUnit } from '@/types/CampaignsBoard';
import { Modal } from 'react-native-paper';
import { View } from 'react-native';
import Colors from '@/constants/Colors';

interface IProps {
  igsid: string,
  conversation: IConversationUnit
  onCloseModal: () => void
}
const ChatModal: React.FC<IProps> = (props: IProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Handle modal opening logic
    // You can perform any action when the component is mounted
  }, []);

  const handleCloseModal = () => {
    setIsOpen(false);
    props.onCloseModal()
    // Additional logic on modal close
  };

  if (!props.conversation) {
    return null;
  }

  return (
    <Modal
      visible={isOpen}
      onDismiss={handleCloseModal}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
      }}
      contentContainerStyle={{
        backgroundColor: props.conversation || props.igsid ? Colors.regular.white : "transparent",
        borderRadius: 5,
        marginTop: 24,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <ChatWindow handleCloseModal={handleCloseModal} {...props} />
      </View>
    </Modal>
  );
};

export default ChatModal;
