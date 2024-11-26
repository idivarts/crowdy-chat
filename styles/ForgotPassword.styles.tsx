import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: Colors(theme).background,
    },
    logo: {
      fontSize: 24,
      marginBottom: 20,
    },
    formContainer: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 50,
      position: "relative",
    },
    title: {
      position: "absolute",
      backgroundColor: Colors(theme).background,
      color: Colors(theme).text,
      top: -10,
      left: 10,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    input: {
      padding: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      color: Colors(theme).text,
      width: 300,
      borderRadius: 5,
    },
    link: {
      color: "blue",
      textAlign: "center",
      marginVertical: 10,
    },
    error: {
      color: "red",
      marginBottom: 10,
    },
  });
