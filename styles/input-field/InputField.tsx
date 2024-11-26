import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 6,
      backgroundColor: Colors(theme).background,
    },
    label: {
      fontSize: 16,
      color: Colors(theme).text,
    },
    input: {
      height: 40,
      borderWidth: 1.5,
      borderRadius: 4,
      borderColor: Colors(theme).lightgray,
      padding: 10,
      fontSize: 16,
      backgroundColor: Colors(theme).background,
      color: Colors(theme).text,
    },
    textArea: {
      height: 100,
    },
  });

export default stylesFn;
