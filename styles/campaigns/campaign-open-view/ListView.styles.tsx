import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleConstant } from "@/constants/Style";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors(theme).background,
      padding: 4,
    },
    tableContainer: {
      marginBottom: 20,
      backgroundColor: Colors(theme).background,
      borderRadius: 8,
      overflow: "hidden",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    userInfo: {
      flexDirection: "column",
    },
    userName: {
      fontWeight: "bold",
    },
    userHandle: {
      fontSize: 12,
      color: "#666",
    },
    groupTitle: {
      fontSize: 18,
      fontWeight: "bold",
      padding: 16,
    },
    groupByContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },
    headerCell: {
      flex: 1,
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderWidth: 0.2,
      minWidth: 150,
      borderColor: "#e0e0e0",
    },
    cell: {
      flex: 1,
      width: 150, // Retain the minimum width
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderWidth: 0.2,
      borderColor: "#e0e0e0",
      justifyContent: "center", // Ensure text aligns in the center
      alignItems: "center", // Align items in the center
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 0.2,
      borderColor: "#e0e0e0",
      minHeight: 50, // Ensure consistent height
    },

    rowText: {
      fontSize: 14,
    },
    scrollView: {
      flex: 1,
      width: "100%",
    },
    divider: {
      height: 1,
      backgroundColor: "#e0e0e0",
    },
  });
