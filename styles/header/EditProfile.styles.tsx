import Colors from "@/constants/Colors";
import { StyleConstant } from "@/constants/Style";
import { Theme } from "@react-navigation/native";
import { StyleSheet, Dimensions } from "react-native";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      width: "100%",
    },
    popup: {
      // width: "100%",
      width: 400,
      padding: StyleConstant.paddingHorizontalForScreen,
      borderRadius: 10,
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    section: {
      alignSelf: "stretch",
      gap: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
      width: "100%",
    },
    settingsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingVertical: 20,
    },
    settingsLabel: {
      fontSize: 18,
    },
  });
