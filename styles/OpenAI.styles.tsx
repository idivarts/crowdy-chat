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
      paddingVertical: 0,
    },
    card: {
      borderColor: Colors(theme).border,
      borderRadius: 5,
      borderWidth: 1,
      elevation: 4,
      gap: 10,
      maxWidth: 400,
      padding: 20,
    },
    cardTitle: {
      color: Colors(theme).text,
      fontWeight: "bold",
      marginBottom: 0,
    },
    instructions: {
      fontSize: 16,
      textAlign: "center",
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
      padding: 0,
    },
  });
