import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleConstant } from "@/constants/Style";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors(theme).background,
      padding: StyleConstant.paddingHorizontalForScreen,
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
      minWidth: 120,
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderWidth: 0.1,
      borderColor: "#e0e0e0",
    },
    cell: {
      flex: 1,
      minWidth: 120,
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderWidth: 0.1,
      borderColor: "#e0e0e0",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "#e0e0e0",
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
