import React, { useState } from 'react';
import { View, Text, Modal } from 'react-native';
import PressableButton from '../ui/pressable-button';
import InputField from '../ui/input/InputField';
import { useBreakPoints } from '@/hooks';
import styles from '@/styles/leads/CreateTagModal.styles';

interface CreateTagModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const CreateTagModal: React.FC<CreateTagModalProps> = ({
  visible,
  onDismiss,
}) => {
  const { lg } = useBreakPoints();
  const [tagName, setTagName] = useState('');

  const handleCreateTag = () => {
    setTagName('');
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onDismiss}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            {
              width: lg ? '40%' : '80%',
            }
          ]}
        >
          <Text style={styles.modalTitle}>Create Tag</Text>
          <InputField
            placeholder="Tag Name"
            value={tagName}
            onChangeText={setTagName}
          />
          <View style={styles.actions}>
            <PressableButton
              title="Create Tag"
              onPress={handleCreateTag}
            />
            <PressableButton
              title="Cancel"
              onPress={onDismiss}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTagModal;
