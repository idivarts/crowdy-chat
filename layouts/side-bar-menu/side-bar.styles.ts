import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    sideBarMenuItem: {
      paddingHorizontal: 18,
      paddingVertical: 12,
    },
    card: {
      width: "100%",
      backgroundColor: Colors(theme).background,
    },
    cardContent: {},
    organizationCard: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: Colors(theme).background,
    },
    organizationName: {
      marginLeft: 10,
      fontSize: 16,
      color: Colors(theme).text,
    },
    separator: {
      height: 1,
      backgroundColor: "#e0e0e0",
      marginVertical: 8,
    },
  });
