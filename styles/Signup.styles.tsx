import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors(theme).background,
      padding: 20,
    },
    logo: {
      fontSize: 24,
      marginBottom: 20,
    },
    formContainer: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 20,
      height: 400,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
      width: 300,
      borderColor: "#ccc",
      color: Colors(theme).text,
      borderRadius: 5,
    },
    link: {
      marginTop: 15,
      color: "blue",
    },
    error: {
      color: "red",
    },
  });
