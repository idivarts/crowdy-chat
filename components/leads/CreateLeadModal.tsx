import React, { useState } from 'react';
import { View, Text, Modal } from 'react-native';
// @ts-ignore
import MultiSelect from 'react-native-multi-select';
import * as DocumentPicker from 'expo-document-picker';
import PressableButton from '../ui/pressable-button';
import styles from '@/styles/leads/CreateLeadModal.styles';

const sources = [
  { id: '1', name: 'Facebook' },
  { id: '2', name: 'Instagram' },
  { id: '3', name: 'WhatsApp' },
];

interface CreateLeadModalProps {
  leads: any[];
  onDismiss: () => void;
  setLeads: (leads: any[]) => void;
  visible: boolean;
}

const CreateLeadModal: React.FC<CreateLeadModalProps> = ({
  leads,
  onDismiss,
  setLeads,
  visible,
}) => {
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  const handleImportFromCSV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
      });
      // if (result.type === 'success') {
      // Process CSV file
      console.log(result);
      // }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLeads = () => {
    // Example: Adding dummy lead
    const newLead = {
      id: `${leads.length + 1}`,
      name: 'New Lead',
      source: selectedSources.join(', '),
      campaigns: [],
      image: 'https://via.placeholder.com/50',
    };
    setLeads([...leads, newLead]);
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
        <Text style={styles.modalTitle}>Create Lead</Text>

        <View
          style={styles.modalContent}
        >
          {/* {
            leads?.length > 0 && (
              <MultiSelect
                items={sources}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedSources}
                selectedItems={selectedSources}
                selectText="Pick Sources"
                searchInputPlaceholderText="Search Sources..."
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#48d22b"
                submitButtonText="Submit"
              />
            )
          } */}

          <PressableButton title="Import from CSV" onPress={handleImportFromCSV} />

          <View style={styles.actions}>
            <PressableButton title="Create Lead" onPress={handleCreateLeads} />
            <PressableButton title="Cancel" onPress={onDismiss} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateLeadModal;
