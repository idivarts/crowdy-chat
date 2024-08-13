import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Appbar, Portal } from 'react-native-paper';

import CreateLeadModal from '@/components/leads/CreateLeadModal';
import CreateTagModal from '@/components/leads/CreateTagModal';
import LeadTableHeader from '@/components/leads/LeadTableHeader';
import LeadTableRow from '@/components/leads/LeadTableRow';
import InputField from '@/components/ui/input/InputField';
import Colors from '@/constants/Colors';

const Leads = () => {
  const [isCreateLeadVisible, setCreateLeadVisible] = useState(false);
  const [isCreateTagVisible, setCreateTagVisible] = useState(false);
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
  const [selectedLeads, setSelectedLeads] = useState<any>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>(leads);
  const [searchQuery, setSearchQuery] = useState('');

  const showCreateLeadModal = () => setCreateLeadVisible(true);
  const hideCreateLeadModal = () => setCreateLeadVisible(false);

  const showCreateTagModal = () => setCreateTagVisible(true);
  const hideCreateTagModal = () => setCreateTagVisible(false);

  const handleDeleteLead = (leadId: string) => {
    setLeads(leads.filter((lead) => lead.id === leadId));
    setSelectedLeads([]);
  };

  const handleSelectLead = (leadId: string) => {
    if (selectedLeads?.includes(leadId)) {
      setSelectedLeads(selectedLeads.filter((id: string) => id !== leadId));
    } else {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  }

  const handleSelectAll = () => {
    if (selectedLeads?.length === leads?.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
    }
  }

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

      {
        !leads?.length ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '400',
              }}
            >
              No leads yet
            </Text>
          </View>
        ) : (
          <View
            style={{
              gap: 20,
            }}
          >
            <InputField
              placeholder="Search Leads"
              value={searchQuery}
              onChangeText={handleSearch}
            />

            <FlatList
              data={filteredLeads}
              ListHeaderComponent={() => (
                <LeadTableHeader
                  isSelected={selectedLeads?.length === leads?.length}
                  onSelect={handleSelectAll}
                />
              )}
              renderItem={({ item }) => (
                <LeadTableRow
                  isSelected={selectedLeads?.includes(item.id)}
                  item={item}
                  onDelete={handleDeleteLead}
                  onSelect={handleSelectLead}
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
        )
      }

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
