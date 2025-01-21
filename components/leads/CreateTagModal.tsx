import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useBreakPoints } from '@/hooks';
import Button from '../ui/button/Button';
import { useTheme } from '@react-navigation/native';
import stylesFn from '@/styles/leads/CreateTagModal.styles';
import { Text, View } from '../Themed';
import TextInput from '../ui/text-input/TextInput';

interface CreateTagModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const CreateTagModal: React.FC<CreateTagModalProps> = ({
  visible,
  onDismiss,
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);
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
          <TextInput
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
