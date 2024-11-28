import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: Colors(theme).lightgray,
    },
    checkboxContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 48,
    },
    actionContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 8,
    },
    actionText: {
      fontWeight: "500",
      fontSize: 14,
      textAlign: "center",
    },
    rowContainer: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 56,
      borderBottomWidth: 1,
      borderColor: Colors(theme).lightgray,
      paddingHorizontal: 16,
    },
    rowTextContainer: {
      width: 150,
      justifyContent: "center",
      alignItems: "flex-start",
      paddingVertical: 8,
    },
    rowText: {
      fontWeight: "400",
      fontSize: 14,
    },
    headerTitle: {
      fontWeight: "600",
      fontSize: 16,
      textAlign: "left",
      paddingHorizontal: 16,
    },
    headerTitleContainer: {
      flex: 1,
      justifyContent: "center",
      paddingVertical: 8,
    },
  });

export default stylesFn;
