import React, { useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { Checkbox, PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import FileUploadInput from '../ui/file-upload-input/FileUploadInput';
import styles from '@/styles/leads/CreateLeadModal.styles';
import Colors from '@/constants/Colors';
import { useBreakPoints } from '@/hooks';
import CustomPaperTheme from '@/constants/Theme';
import Button from '../ui/button/Button';
import Menu from '../ui/menu/Menu';
import MenuItem from '../ui/menu/MenuItem';

const sources = [
  { id: '1', name: 'Facebook' },
  { id: '2', name: 'Instagram' },
  { id: '3', name: 'WhatsApp' },
];

const tags = [
  { id: '1', name: 'Tag 1' },
  { id: '2', name: 'Tag 2' },
  { id: '3', name: 'Tag 3' },
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
  const [selectedSources, setSelectedSources] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState<any>('');
  const [tagMenuVisible, setTagMenuVisible] = useState(false);
  const { lg } = useBreakPoints();

  const handleSelectSources = (selectedItem: any) => {
    if (selectedSources.includes(selectedItem)) {
      setSelectedSources(selectedSources.filter((source) => source !== selectedItem));
    } else {
      setSelectedSources([...selectedSources, selectedItem]);
    }
  };

  const handleSelectTag = (tag: any) => {
    setSelectedTag(tag);
    setTagMenuVisible(false);
  };

  const handleCreateLeads = () => {
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
      <PaperProvider theme={CustomPaperTheme}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {
                width: lg ? '50%' : '80%',
              }
            ]}
          >
            <Text style={styles.modalTitle}>Create Lead</Text>

            <View
              style={[
                styles.checkboxGroup,
                {
                  flexDirection: lg ? 'row' : 'column',
                }
              ]}
            >
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Select Sources:</Text>
              <View style={styles.checkboxGroup}>
                {
                  sources.map((source) => (
                    <View
                      key={source.id}
                      style={styles.checkboxContainer}
                    >
                      <Checkbox
                        status={selectedSources.includes(source) ? 'checked' : 'unchecked'}
                        onPress={() => handleSelectSources(source)}
                      />
                      <Text>{source.name}</Text>
                    </View>
                  ))
                }
              </View>
            </View>

            <FileUploadInput
              description='Upload a .csv file to import leads'
              onChange={(uri) => console.log(uri)}
            />

            <View
              style={[
                styles.actions,
                {
                  flexWrap: 'wrap',
                }
              ]}
            >
              <Menu
                visible={tagMenuVisible}
                onDismiss={() => {
                  setTagMenuVisible(false);
                }}
                anchor={
                  <Pressable onPress={() => setTagMenuVisible(true)}>
                    <View style={styles.selectTagButton}>
                      <Text>{selectedTag?.name || 'Select Tag'}</Text>
                      <Ionicons name="chevron-down" size={20} color={Colors.regular.black} />
                    </View>
                  </Pressable>
                }
              >
                {
                  tags.map((tag) => (
                    <MenuItem
                      key={tag.id}
                      onPress={() => handleSelectTag(tag)}
                      title={tag.name}
                    />
                  ))
                }
              </Menu>
              <View style={styles.actions}>
                <Button
                  mode='contained'
                  onPress={handleCreateLeads}
                >
                  Create Lead
                </Button>
                <Button
                  mode='contained'
                  onPress={onDismiss}
                >
                  Cancel
                </Button>
              </View>
            </View>

          </View>
        </View>
      </PaperProvider>
    </Modal>
  );
};

export default CreateLeadModal;
