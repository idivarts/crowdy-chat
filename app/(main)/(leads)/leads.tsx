import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Appbar, DataTable, Portal, TextInput } from "react-native-paper";

import CreateLeadModal from "@/components/leads/CreateLeadModal";
import CreateTagModal from "@/components/leads/CreateTagModal";
import Colors from "@/constants/Colors";
import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import ExpoCheckbox from "expo-checkbox/build/ExpoCheckbox";
import { useIsFocused, useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/leads/LeadsTable.styles";
import { Text, View } from "@/components/Themed";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { useOrganizationContext } from "@/contexts";
import { StyleConstant } from "@/constants/Style";
import EmptyState from "@/components/EmptyState";
import { ILeads } from "@/shared-libs/firestore/crowdy-chat/models/leads";

const Leads = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [isCreateLeadVisible, setCreateLeadVisible] = useState(false);
  const [isCreateTagVisible, setCreateTagVisible] = useState(false);
  const [leads, setLeads] = useState<ILeads[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<any>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>(leads);
  const [searchQuery, setSearchQuery] = useState("");
  const { lg } = useBreakPoints();
  const [loadingLeads, setLoadingLeads] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { currentOrganization } = useOrganizationContext();

  const showCreateLeadModal = () => setCreateLeadVisible(true);
  const hideCreateLeadModal = () => setCreateLeadVisible(false);

  const showCreateTagModal = () => setCreateTagVisible(true);
  const hideCreateTagModal = () => setCreateTagVisible(false);

  const modifyLeadStatus = async (leadId: string) => {
    try {
      setLoadingLeads((prev) => ({ ...prev, [leadId]: true }));

      if (!currentOrganization) return;

      const leadRef = doc(
        FirestoreDB,
        "organizations",
        currentOrganization?.id,
        "leads",
        leadId
      );
      const leadData = leads.find((lead) => lead.id === leadId);
      if (!leadData) return;

      const updatedStatus = leadData.status === 1 ? 30 : 1;

      await updateDoc(leadRef, {
        ...leadData,
        status: updatedStatus,
        updatedAt: new Date().getTime(),
      });

      const updatedLeads = leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: updatedStatus } : lead
      );

      setLeads(updatedLeads);

      setFilteredLeads((prevFilteredLeads) =>
        prevFilteredLeads.map((lead) =>
          lead.id === leadId ? { ...lead, status: updatedStatus } : lead
        )
      );
    } catch (error) {
      console.error("Error updating lead:", error);
    } finally {
      setLoadingLeads((prev) => ({ ...prev, [leadId]: false }));
    }
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
        lead.name?.toLowerCase().includes(query.toLowerCase())
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
    const leads = leadData.docs.map((doc) => doc.data() as ILeads);
    setLeads(leads);
    setFilteredLeads(leads);
  };

  useEffect(() => {
    fetchLeads();
  }, [, useIsFocused()]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredLeads(leads);
    }
  }, [leads, searchQuery]);

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
          padding: StyleConstant.paddingHorizontalForScreen,
          flex: 1,
        }}
      >
        {!leads?.length ? (
          <EmptyState
            message="No leads found"
            onPress={showCreateLeadModal}
            buttonPresent={true}
            image={require("@/assets/images/empty-illusatration.png")}
            buttonName="Create Lead"
          />
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
              style={{
                backgroundColor: Colors(theme).background,
              }}
              onChangeText={handleSearch}
              value={searchQuery}
            />
            <ScrollView horizontal={Platform.OS !== "web"}>
              <DataTable>
                <DataTable.Header style={styles.headerContainer}>
                  <DataTable.Title style={styles.checkboxContainer}>
                    <ExpoCheckbox
                      value={selectedLeads?.length === leads?.length}
                      onValueChange={handleSelectAll}
                    />
                  </DataTable.Title>
                  <DataTable.Title style={styles.headerTitleContainer}>
                    Name
                  </DataTable.Title>
                  <DataTable.Title style={styles.headerTitleContainer}>
                    Source
                  </DataTable.Title>
                  <DataTable.Title style={styles.headerTitleContainer}>
                    Campaigns
                  </DataTable.Title>
                  <DataTable.Title style={styles.actionContainer} numeric>
                    Actions
                  </DataTable.Title>
                </DataTable.Header>

                {filteredLeads.map((lead, index) => (
                  <DataTable.Row key={index} style={styles.rowContainer}>
                    <DataTable.Cell style={styles.checkboxContainer}>
                      <ExpoCheckbox
                        value={selectedLeads?.includes(lead.id)}
                        onValueChange={() => handleSelectLead(lead.id)}
                      />
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.rowTextContainer}>
                      {lead.name}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.rowTextContainer}>
                      {lead.sourceId}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.rowTextContainer}>
                      {lead.id}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.actionContainer} numeric>
                      {loadingLeads[lead.id] ? (
                        <ActivityIndicator
                          size="small"
                          color={Colors(theme).primary}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => modifyLeadStatus(lead.id)}
                        >
                          <Text style={{ color: Colors(theme).primary }}>
                            {lead.status === 1 ? "Disable" : "Enable"}
                          </Text>
                        </TouchableOpacity>
                      )}
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
