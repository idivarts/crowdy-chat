import { StyleConstant } from "@/constants/Style";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    modalContent: {
      padding: 20,
      borderRadius: 10,
      width: 300,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    modalButton: {
      marginVertical: 10,
      paddingVertical: 5,
      fontSize: 13,
    },
    modalInput: {
      marginVertical: 10,
    },
    faceBookView: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      borderRadius: 20,
      backgroundColor: "#1976D2",
    },
  });
