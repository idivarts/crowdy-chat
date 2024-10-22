import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    sideBarMenuItem: {
      paddingHorizontal: 18,
      paddingVertical: 12,
    },
  });
