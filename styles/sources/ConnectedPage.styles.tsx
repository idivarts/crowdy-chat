import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    card: {},
    row: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderRadius: 8,
      justifyContent: "space-between",
      borderWidth: 0.3,
      borderColor: Colors(theme).gray300,
    },
    leftSection: {
      flex: 2,
      flexDirection: Platform.OS === "web" ? "row" : "column",
      gap: Platform.OS === "web" ? 10 : 0,
    },
    rightSection: {
      flex: 1,
      alignItems: "flex-end",
    },
    campaign: {
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
    },
    campaignText: {
      fontSize: 12,
      color: Colors(theme).text,
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
    menuStyle: {
      backgroundColor: Colors(theme).background,
    },
    menuTitleStyle: {
      color: Colors(theme).text,
    },

    link: {
      color: "#007bff",
      flexDirection: Platform.OS === "web" ? "row" : "column",
    },
    underline: {
      textDecorationLine: "underline",
      marginRight: 5,
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
