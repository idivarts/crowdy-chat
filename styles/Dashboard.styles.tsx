import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
export const CreateCampaignstylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "80%",
      borderRadius: 8,
      padding: 16,
      height: "90%",
      position: "absolute",
      bottom: 0,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 16,
    },
    steps: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 16,
    },
    stepContainer: {
      padding: 16,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      flex: 1,
    },
    stepContainer2: {
      padding: 16,
      width: "100%",
      textAlign: "left",
      flex: 1,
    },
    stageContainer: {
      borderColor: "#ccc",
      borderRadius: 4,
      padding: 8,
      width: "100%",
      marginVertical: 8,
      gap: 18,
    },
    textArea: {
      width: "100%",
      marginVertical: 8,
      backgroundColor: Colors(theme).background,
    },
    inputWrapper: {
      marginBottom: 20,
      gap: 8,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
    },
    editIcon: {
      position: "absolute",
      right: 10,
      top: 10,
      padding: 10,
    },
    collectibleContainer: {
      flexDirection: "column",
      gap: 8,
      alignItems: "center",
      display: "flex",
      width: "100%",
    },
    row: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      display: "flex",
      width: "100%",
    },
    rowCampaignOne: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
    },
    step3Container: {
      flexDirection: "row",
      width: "100%",
      flex: 1,
    },
    sidebar: {
      marginRight: 16,
      gap: 12,
    },
    sidebarItem: {
      borderRadius: 4,
      color: Colors(theme).white,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    BottomRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      justifyContent: "flex-end",
    },
    modalContent: {
      paddingBottom: 16,
    },
    stageActive: {
      backgroundColor: Colors(theme).primary,
      color: Colors(theme).white,
    },
    stageInactive: {
      backgroundColor: Colors(theme).lightgray,
    },
    progressContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 20,
    },
    progressDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: Colors(theme).lightgray,
      marginHorizontal: 5,
    },
    activeProgressDot: {
      backgroundColor: Colors(theme).primary,
    },
  });
