import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      backgroundColor: Colors(theme).aliceBlue,
      alignItems: "center",
    },
    headerTitleContainer: {
      flex: 2, // Adjust flex to balance space distribution
      justifyContent: "center",
    },
    headerTitle: {
      fontWeight: "500",
      fontSize: 14,
      color: Colors(theme).primary,
    },
    checkboxContainer: {
      flex: 1, // Ensure minimal space for checkboxes
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 4,
    },
    checkboxText: {
      textAlign: "center",
    },
    actionContainer: {
      flex: 1, // Minimal space for actions
      alignItems: "center",
    },
    actionText: {
      fontWeight: "500",
      fontSize: 14,
      color: Colors(theme).primary,
    },
    rowContainer: {
      paddingVertical: 6, // Reduce padding for rows
      minHeight: 50,
    },
    rowTextContainer: {
      flex: 2, // Match with headerTitleContainer for alignment
      justifyContent: "center",
    },
    rowText: {
      fontWeight: "400",
      fontSize: 13,
    },
  });
export default stylesFn;
