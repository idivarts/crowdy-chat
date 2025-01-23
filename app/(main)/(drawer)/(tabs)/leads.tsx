import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { DataTable, IconButton, Portal } from "react-native-paper";

import EmptyState from "@/components/EmptyState";
import CreateLeadModal from "@/components/leads/CreateLeadModal";
import CreateTagModal from "@/components/leads/CreateTagModal";
import ProfileCircle from "@/components/profile/ProfileCircle";
import ScreenHeader from "@/components/screen-header";
import { Text, View } from "@/components/Themed";
import TextInput from "@/components/ui/text-input/TextInput";
import Colors from "@/constants/Colors";
import { StyleConstant } from "@/constants/Style";
import { useOrganizationContext } from "@/contexts";
import { useBreakPoints } from "@/hooks";
import AppLayout from "@/layouts/app-layout";
import { ILeads } from "@/shared-libs/firestore/crowdy-chat/models/leads";
import stylesFn from "@/styles/leads/LeadsTable.styles";
import { FirestoreDB } from "@/utils/firestore";
import { faBars, faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  DrawerActions,
  useIsFocused,
  useTheme,
} from "@react-navigation/native";
import ExpoCheckbox from "expo-checkbox/build/ExpoCheckbox";
import { useNavigation } from "expo-router";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const Leads = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [isCreateLeadVisible, setCreateLeadVisible] = useState(false);
  const [isCreateTagVisible, setCreateTagVisible] = useState(false);
  const [leads, setLeads] = useState<ILeads[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<any>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>(leads);
  const [searchQuery, setSearchQuery] = useState("");
  const { xl } = useBreakPoints();
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

  const navigation = useNavigation();

  return (
    <AppLayout>
      <ScreenHeader
        title="Leads"
        rightAction
        leftIcon={!xl ? faBars : null}
        rightActionButton={<ProfileCircle />}
        action={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            padding: StyleConstant.paddingHorizontalForScreen,
            paddingTop: 0,
            flex: 1,
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <TextInput
              containerStyle={{
                flex: 1,
              }}
              label="Search Leads"
              mode="outlined"
              onChangeText={handleSearch}
              value={searchQuery}
            />
            <IconButton
              icon={() =>
                <FontAwesomeIcon
                  icon={faPlus}
                  size={20}
                  color={Colors(theme).primary}
                />
              }
              size={20}
              onPress={showCreateLeadModal}
            />
            <IconButton
              icon={() =>
                <FontAwesomeIcon
                  icon={faTag}
                  size={20}
                  color={Colors(theme).primary}
                />
              }
              size={20}
              onPress={showCreateTagModal}
            />
          </View>
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
              <ScrollView>
                <DataTable>
                  <View style={styles.headerContainer}>
                    <DataTable.Cell style={styles.checkboxContainer}>
                      <ExpoCheckbox
                        value={
                          selectedLeads?.length === leads?.length &&
                          selectedLeads?.length > 0
                        }
                        onValueChange={handleSelectAll}
                      />
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.rowTextContainer}>
                      Name
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.rowTextContainer}>
                      Source
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.rowTextContainer}>
                      ID
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.rowTextContainer}>
                      Actions
                    </DataTable.Cell>
                  </View>

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
                      <DataTable.Cell style={styles.rowTextContainer}>
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
    </AppLayout>
  );
};

export default Leads;
