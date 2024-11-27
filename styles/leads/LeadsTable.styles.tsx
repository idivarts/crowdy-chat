import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      backgroundColor: Colors(theme).lightgray,
      flexDirection: "row",
      alignItems: "center",
      minHeight: 56, // Ensures uniform height across rows
      borderBottomWidth: 0.5,
      borderColor: Colors(theme).lightgray,
    },
    headerTitleContainer: {
      flex: 2, // Match flex with header
      justifyContent: "center",
      alignItems: "center",
      minWidth: 100, // Min width for text
      paddingHorizontal: 8,
    },
    headerTitle: {
      fontWeight: "500",
      fontSize: 14,
      color: Colors(theme).primary,
      textAlign: "center",
    },
    checkboxContainer: {
      flex: 1,
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
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12, // Consistent padding
      minHeight: 56, // Ensures uniform height across rows
      borderBottomWidth: 0.5,
      borderColor: Colors(theme).lightgray,
    },

    rowTextContainer: {
      flex: 2, // Match flex with header
      justifyContent: "center",
      alignItems: "center",
      minWidth: 100, // Min width for text
      paddingHorizontal: 8,
    },
    rowText: {
      fontWeight: "400",
      fontSize: 13,
    },
  });
export default stylesFn;
