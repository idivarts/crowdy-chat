import CreateLeadModal from '@/components/leads/CreateLeadModal';
import CreateTagModal from '@/components/leads/CreateTagModal';
import LeadTableHeader from '@/components/leads/LeadTableHeader';
import LeadTableRow from '@/components/leads/LeadTableRow';
import InputField from '@/components/ui/input/InputField';
import Colors from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Appbar, Portal } from 'react-native-paper';

const Leads = () => {
  const [isCreateLeadVisible, setCreateLeadVisible] = useState(false);
  const [isCreateTagVisible, setCreateTagVisible] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<any>([]);
  const [leads, setLeads] = useState<any[]>([
    {
      id: '1',
      name: 'John Doe',
      source: 'Facebook',
      campaigns: ['Campaign 1'],
      image: 'https://via.placeholder.com/50',
    },
    {
      id: '2',
      name: 'Jane Smith',
      source: 'Instagram',
      campaigns: ['Campaign 2'],
      image: 'https://via.placeholder.com/50',
    },
  ]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>(leads);
  const [searchQuery, setSearchQuery] = useState('');

  const showCreateLeadModal = () => setCreateLeadVisible(true);
  const hideCreateLeadModal = () => setCreateLeadVisible(false);

  const showCreateTagModal = () => setCreateTagVisible(true);
  const hideCreateTagModal = () => setCreateTagVisible(false);

  const handleDeleteLead = (leadId: string) => {
    setLeads(leads.filter(lead => !selectedLeads?.includes(leadId)));
    setSelectedLeads([]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredLeads(leads);
    } else {
      const filtered = leads.filter(lead =>
        lead.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredLeads(filtered);
    }
  }

  useEffect(() => {
    setFilteredLeads(leads);
  }, [leads]);

  if (!leads?.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Leads yet</Text>
        <Button title="Create Lead" onPress={showCreateLeadModal} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.regular.white,
      }}
    >
      <Appbar.Header>
        <Appbar.Content title="Leads" />
        <Appbar.Action icon="plus" onPress={showCreateLeadModal} />
        <Appbar.Action icon="tag" onPress={showCreateTagModal} />
      </Appbar.Header>

      <View
        style={{
          gap: 10,
        }}
      >
        <InputField
          placeholder="Search Leads"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <FlatList
          data={filteredLeads}
          ListHeaderComponent={() => <LeadTableHeader />}
          renderItem={({ item }) => (
            <LeadTableRow
              item={item}
              backgroundColor={selectedLeads?.includes(item.id) ? Colors.regular.lightgray : Colors.regular.white}
              onDelete={handleDeleteLead}
            />
          )}
          keyExtractor={item => item.id}
          extraData={selectedLeads}
          style={{ marginBottom: 60 }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: Colors.regular.white,
              }}
            />
          )}
        />
      </View>

      <Portal>
        {
          leads?.length > 0 && (
            <CreateLeadModal
              visible={isCreateLeadVisible}
              onDismiss={hideCreateLeadModal}
              setLeads={setLeads}
              leads={leads}
            />
          )
        }

        <CreateTagModal
          visible={isCreateTagVisible}
          onDismiss={hideCreateTagModal}
        />
      </Portal>
    </View>
  );
};

export default Leads;
