import React, { useState } from 'react';
import { View, Text, Modal } from 'react-native';
import InputField from '../ui/input/InputField';
import { useBreakPoints } from '@/hooks';
import styles from '@/styles/leads/CreateTagModal.styles';
import Button from '../ui/button/Button';

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
            <Button
              mode="contained"
              onPress={handleCreateTag}
            >
              Create Tag
            </Button>
            <Button
              mode="contained"
              onPress={onDismiss}
            >
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTagModal;
