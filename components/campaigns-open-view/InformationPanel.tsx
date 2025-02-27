import { useOrganizationContext } from "@/contexts";
import ConversationService from "@/services/conversation.service";
import { IConversationUnit } from "@/services/interfaces/conversations";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { UpdateConversationSubject } from "@/subjects/conversation.update.subject";
import { AuthApp } from "@/utils/auth";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import { Text, View } from "../Themed";

interface IProps {
  conversation: IConversationUnit;
  title?: string;
  objectKey: string;
  isEdit?: boolean;
  isStop?: boolean;
  stopKey?: any;
  isCopy?: boolean;
  inputType?: string;
  isInformation?: boolean;
}

const GridRow: React.FC<IProps> = ({
  conversation,
  title,
  objectKey: key,
  inputType,
  isEdit,
  isStop,
  stopKey,
  ...props
}) => {
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState<any>(conversation.currentPhase);
  const { currentOrganization } = useOrganizationContext();

  // @ts-ignore
  const setData = (val: string) => {
    if (inputType === "number") {
      const parsedValue = parseInt(val, 10);
      setEditData(isNaN(parsedValue) ? 0 : parsedValue); // Default to 0 if NaN
    } else {
      setEditData(val);
    }
  };

  const onClickSave = async () => {
    try {
      const user = await AuthApp.currentUser?.getIdToken();
      const campaignId = conversation.campaignId;
      const organizationId = currentOrganization?.id;
      const firebaseId = user;

      if (!campaignId || !organizationId || !firebaseId) {
        return Toaster.error(
          "Campaign ID, Organization ID, or Firebase ID is missing"
        );
      }

      if (isStop) {
        //@ts-ignore
        if (conversation[stopKey]) {
          await ConversationService.updateConversation(
            campaignId,
            conversation.id,
            organizationId,
            undefined,
            undefined,
            firebaseId
          );
        } else {
          return Toaster.error("There is no queue to stop");
        }
      }

      if (isEdit || props.isInformation) {
        setEdit(!edit);
        const newPhase = key === "currentPhase" ? editData : undefined;
        const status = key === "status" ? editData : undefined;

        const updatedConversation =
          await ConversationService.updateConversation(
            campaignId,
            conversation.id,
            organizationId,
            newPhase,
            status,
            firebaseId
          );

        // Update local conversation state
        UpdateConversationSubject.next({
          ...conversation,
          ...(newPhase !== undefined && { currentPhase: newPhase }),
          ...(status !== undefined && { status }),
        });
      }

      if (props.isCopy) {
        //@ts-ignore
        Clipboard.setStringAsync(conversation[key]);
        Toaster.info("Copied to clipboard");
      }

      Toaster.success("Update successful");
    } catch (e) {
      console.error(e);
      Toaster.error("Something went wrong");
    }
  };

  return (
    <View style={styles.gridRow}>
      <View style={styles.gridItem}>
        <Text style={styles.label}>{title}</Text>
      </View>
      <View style={[styles.gridItem, styles.contentItem]}>
        {!edit ? (
          //@ts-ignore
          <Text>{conversation[key]}</Text>
        ) : (
          <TextInput
            style={styles.input}
            keyboardType={inputType === "number" ? "numeric" : "default"}
            value={editData}
            onChangeText={setData}
          />
        )}
      </View>
      {(isEdit || props.isInformation) && (
        <>
          {!edit ? (
            <IconButton icon="pencil" onPress={() => setEdit(!edit)} />
          ) : (
            <IconButton icon="content-save" onPress={onClickSave} />
          )}
        </>
      )}
      {isStop && (
        <IconButton icon="stop-circle-outline" onPress={onClickSave} />
      )}
      {props.isCopy && <IconButton icon="content-copy" onPress={onClickSave} />}
    </View>
  );
};

const InformationPanel: React.FC<{
  conversation: IConversationUnit;
}> = ({ conversation }) => {
  return (
    <ScrollView style={styles.chatInfo}>
      <Text style={styles.dialogTitle}>Basic Information</Text>
      <GridRow
        conversation={conversation}
        title={"Status"}
        objectKey={"status"}
        isEdit={true}
        inputType={"number"}
      />
      <GridRow
        conversation={conversation}
        title={"Current Phase"}
        objectKey={"currentPhase"}
        isEdit={true}
        inputType={"number"}
      />
      <GridRow
        conversation={conversation}
        title={"Next Message Time"}
        objectKey={"nextMessageTime"}
        isStop={true}
        stopKey={"messageQueue"}
      />
      <GridRow
        conversation={conversation}
        title={"Next Reminder Time"}
        objectKey={"nextReminderTime"}
        isStop={true}
        stopKey={"reminderQueue"}
      />
      <GridRow
        conversation={conversation}
        title={"Last Message Id"}
        objectKey={"lastMid"}
        isCopy={true}
      />
      <GridRow
        conversation={conversation}
        title={"Total Bot Messages"}
        objectKey={"botMessageCount"}
      />
      <GridRow
        conversation={conversation}
        title={"Reminder Count"}
        objectKey={"reminderCount"}
      />
      <View style={styles.gridItem}>
        <Text style={styles.label}>Page Name</Text>
        <Text style={styles.ellipsis}>
          {conversation.user.userProfile.name}
        </Text>
      </View>
      <Text style={styles.dialogTitle}>Phase 1 Data</Text>
      <GridRow
        conversation={conversation}
        title={"Chat Phase"}
        objectKey={"phase"}
        isInformation={true}
        inputType={"number"}
      />
      <GridRow
        conversation={conversation}
        title={"Interested"}
        objectKey={"interestedInService"}
        isInformation={true}
        inputType={"checkbox"}
      />
      <Text style={styles.dialogTitle}>Phase 2 Data</Text>
      <GridRow
        conversation={conversation}
        title={"Engagement"}
        objectKey={"engagement"}
        isInformation={true}
      />
      <GridRow
        conversation={conversation}
        title={"Engagement Unit"}
        objectKey={"engagement_unit"}
        isInformation={true}
      />
      <GridRow
        conversation={conversation}
        title={"Views"}
        objectKey={"views"}
        isInformation={true}
      />
      <GridRow
        conversation={conversation}
        title={"Views Unit"}
        objectKey={"views_unit"}
        isInformation={true}
      />
      <GridRow
        conversation={conversation}
        title={"Video Category"}
        objectKey={"video_category"}
        isInformation={true}
      />
      <GridRow
        conversation={conversation}
        title={"Brand Category"}
        objectKey={"brand_category"}
        isInformation={true}
      />
      <Text style={styles.dialogTitle}>Phase 3 Data</Text>
      <GridRow
        conversation={conversation}
        title={"Interested in Beta App"}
        objectKey={"interestedInApp"}
        isInformation={true}
      />
      <Text style={styles.dialogTitle}>Phase 4 Data</Text>
      <GridRow
        conversation={conversation}
        title={"Preferred Brands"}
        objectKey={"collaboration_brand"}
        isInformation={true}
      />
      <GridRow
        conversation={conversation}
        title={"Preferred Brand Products"}
        objectKey={"collaboration_product"}
        isInformation={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chatInfo: {
    padding: 10,
    maxHeight: 400,
    flex: 1,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  gridRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
  },
  contentItem: {
    flex: 1.5,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    padding: 5,
  },
  ellipsis: {
    overflow: "hidden",
  },
});

export default InformationPanel;
