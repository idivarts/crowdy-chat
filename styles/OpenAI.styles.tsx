import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    card: {
      elevation: 4,
      borderRadius: 12,
      maxWidth: 400,
      padding: 20,
      borderWidth: Platform.OS === "web" ? 0 : 0.2,
    },
    cardTitle: {
      color: "#2196F3",
      fontWeight: "bold",
    },
    instructions: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 24,
    },
    textInput: {
      height: 50,
      flex: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: Colors(theme).card,
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginTop: 10,
    },
    iconContainer: {
      height: 50,
      width: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      backgroundColor: Colors(theme).background,
      color: Colors(theme).text,
    },
    cardActions: {
      justifyContent: "center",
    },
    button: {
      width: "50%",
      borderRadius: 25,
      backgroundColor: "#2196F3",
      color: "#FFF",
    },
  });
