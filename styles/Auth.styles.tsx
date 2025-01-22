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
      width: 80,
      height: 80,
      marginBottom: 20,
    },
    formContainer: {
      borderWidth: 1,
      borderColor: Colors(theme).text,
      borderRadius: 5,
      padding: 20,
      height: 400,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: Colors(theme).border,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    input: {
      marginBottom: 20,
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
    linksContainer: {
      marginTop: 20,
      alignItems: "center",
    },
    link: {
      marginBottom: 10,
    },
    error: {
      color: "red",
    },
  });
