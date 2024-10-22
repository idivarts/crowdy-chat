import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    button: {
      borderRadius: 4,
    },
  });

export default stylesFn;
