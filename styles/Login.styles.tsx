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
    linksContainer: {
      marginTop: 15,
      alignItems: "center",
    },
    link: {
      color: "blue",
      marginTop: 10,
    },
    error: {
      color: "red",
    },
  });
