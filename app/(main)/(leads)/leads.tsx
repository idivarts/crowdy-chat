import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { Appbar, DataTable, Portal, TextInput } from "react-native-paper";

import CreateLeadModal from "@/components/leads/CreateLeadModal";
import CreateTagModal from "@/components/leads/CreateTagModal";
import Colors from "@/constants/Colors";
import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import ExpoCheckbox from "expo-checkbox/build/ExpoCheckbox";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/leads/LeadsTable.styles";
import { Text, View } from "@/components/Themed";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { useOrganizationContext } from "@/contexts";

const Leads = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [isCreateLeadVisible, setCreateLeadVisible] = useState(false);
  const [isCreateTagVisible, setCreateTagVisible] = useState(false);
  const [leads, setLeads] = useState<any[]>([
    {
      id: "1",
      name: "John Doe",
      source: "Facebook",
      campaigns: ["Campaign 1"],
      image: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      name: "Jane Smith",
      source: "Instagram",
      campaigns: ["Campaign 2"],
      image: "https://via.placeholder.com/50",
    },
  ]);
  const [selectedLeads, setSelectedLeads] = useState<any>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>(leads);
  const [searchQuery, setSearchQuery] = useState("");
  const { lg } = useBreakPoints();
  const { currentOrganization } = useOrganizationContext();

  const showCreateLeadModal = () => setCreateLeadVisible(true);
  const hideCreateLeadModal = () => setCreateLeadVisible(false);

  const showCreateTagModal = () => setCreateTagVisible(true);
  const hideCreateTagModal = () => setCreateTagVisible(false);

  const handleDeleteLead = async (leadId: string) => {
    if (!currentOrganization) return;
    setLeads(leads.filter((lead) => lead.id === leadId));
    const leadRef = doc(
      FirestoreDB,
      "organizations",
      currentOrganization?.id,
      "leads",
      leadId
    );

    const leadData = leads.find((lead) => lead.id === leadId);
    console.log({
      createdAt: leadData.createdAt,
      sourceType: leadData.sourceType,
      sourceId: leadData.sourceId,
      updatedAt: new Date().getTime(),
      status: 30,
    });

    const leadUpdate = await updateDoc(leadRef, {
      createdAt: leadData.createdAt,
      sourceType: leadData.sourceType,
      sourceId: leadData.sourceId,
      updatedAt: new Date().getTime(),
      status: 30,
    });
    setLeads(
      leads.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            status: 30,
          };
        }
        return lead;
      })
    );
  };

  const handleSelectLead = (leadId: string) => {
    if (selectedLeads?.includes(leadId)) {
      setSelectedLeads(selectedLeads.filter((id: string) => id !== leadId));
    } else {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedLeads?.length === leads?.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map((lead) => lead.id));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredLeads(leads);
    } else {
      const filtered = leads.filter((lead) =>
        lead.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLeads(filtered);
    }
  };

  const fetchLeads = async () => {
    if (!currentOrganization) return;
    const leadCols = collection(
      FirestoreDB,
      "organizations",
      currentOrganization?.id,
      "leads"
    );
    const leadData = await getDocs(leadCols);
    const leads = leadData.docs.map((doc) => doc.data());

    setLeads(leads);
  };

  useEffect(() => {
    fetchLeads();
    setFilteredLeads(leads);
  }, [leads]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Appbar.Header
        statusBarHeight={0}
        style={{
          backgroundColor: Colors(theme).background,
        }}
      >
        {!lg && <DrawerToggle />}
        <Appbar.Content title="Leads" />
        <Appbar.Action icon="plus" onPress={showCreateLeadModal} />
        <Appbar.Action icon="tag" onPress={showCreateTagModal} />
      </Appbar.Header>

      <View
        style={{
          padding: 16,
          flex: 1,
        }}
      >
        {!leads?.length ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
              }}
            >
              No leads yet
            </Text>
          </View>
        ) : (
          <View
            style={{
              gap: 16,
              flex: 1,
            }}
          >
            <TextInput
              label="Search Leads"
              mode="outlined"
              onChangeText={handleSearch}
              value={searchQuery}
            />
            <ScrollView>
              <DataTable>
                <ScrollView horizontal></ScrollView>
                <DataTable.Header style={styles.headerContainer}>
                  <DataTable.Title
                    style={styles.checkboxContainer}
                    textStyle={styles.checkboxText}
                  >
                    {/* <Checkbox
                    status={
                      selectedLeads?.length === leads?.length
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => {
                      handleSelectAll();
                    }}
                  /> */}
                    <ExpoCheckbox
                      value={selectedLeads?.length === leads?.length}
                      onValueChange={() => {
                        handleSelectAll();
                      }}
                    />
                  </DataTable.Title>
                  <DataTable.Title
                    style={styles.headerTitleContainer}
                    textStyle={styles.headerTitle}
                  >
                    Name
                  </DataTable.Title>
                  <DataTable.Title
                    style={styles.headerTitleContainer}
                    textStyle={styles.headerTitle}
                  >
                    Source
                  </DataTable.Title>
                  <DataTable.Title
                    style={styles.headerTitleContainer}
                    textStyle={styles.headerTitle}
                  >
                    Campaigns
                  </DataTable.Title>
                  <DataTable.Title textStyle={styles.actionText} numeric>
                    Actions
                  </DataTable.Title>
                </DataTable.Header>

                {filteredLeads.map((lead, index) => (
                  <DataTable.Row key={index} style={styles.rowContainer}>
                    <DataTable.Cell
                      style={styles.checkboxContainer}
                      textStyle={styles.checkboxText}
                    >
                      {/* <Checkbox
                      status={
                        selectedLeads?.includes(lead.id)
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        handleSelectLead(lead.id);
                      }}
                    /> */}
                      <ExpoCheckbox
                        value={selectedLeads?.includes(lead.id)}
                        onValueChange={() => {
                          handleSelectLead(lead.id);
                        }}
                      />
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={styles.rowTextContainer}
                      textStyle={styles.rowText}
                    >
                      {lead.name}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={styles.rowTextContainer}
                      textStyle={styles.rowText}
                    >
                      {lead.sourceId}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={styles.rowTextContainer}
                      textStyle={styles.rowText}
                    >
                      {lead.id}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={styles.actionContainer}
                      textStyle={styles.actionText}
                    >
                      {/* <Button
                      mode="contained"
                      onPress={() => handleDeleteLead(lead.id)}
                    >
                      Delete
                    </Button> */}
                      <TouchableOpacity
                        onPress={() => handleDeleteLead(lead.id)}
                      >
                        <Text style={styles.actionText}>
                          {lead.status === 1 ? "Disable" : "Enable"}
                        </Text>
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </ScrollView>
          </View>
        )}
      </View>

      <Portal>
        {leads?.length > 0 && (
          <CreateLeadModal
            visible={isCreateLeadVisible}
            onDismiss={hideCreateLeadModal}
            setLeads={setLeads}
            leads={leads}
          />
        )}

        <CreateTagModal
          visible={isCreateTagVisible}
          onDismiss={hideCreateTagModal}
        />
      </Portal>
    </View>
  );
};

export default Leads;
