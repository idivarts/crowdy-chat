import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    card: {
      marginVertical: 10,
      padding: 10,
      borderRadius: 8,
      elevation: 2,
      borderWidth: 0.5,
      width: "100%",
      borderColor: "#ddd",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    leftSection: {
      flex: 2,
    },
    rightSection: {
      flex: 1,
      alignItems: "flex-end",
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
    },
    link: {
      marginTop: 5,
      color: "#007bff",
    },
    underline: {
      textDecorationLine: "underline",
    },
    owner: {
      fontSize: 14,
      fontWeight: "500",
    },
    platform: {
      fontSize: 12,
      color: "#666",
    },
    iconButton: {
      marginHorizontal: 5,
    },
  });
