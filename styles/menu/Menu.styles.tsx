import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    menuStyle: {
      backgroundColor: Colors(theme).background,
    },
    menuContentStyle: {
      backgroundColor: Colors(theme).background,
      borderRadius: 8,
      borderTopColor: Colors(theme).lightgray,
      borderTopWidth: 1,
      overflow: "hidden",
      paddingVertical: 0,
    },
    menuItem: {
      backgroundColor: Colors(theme).background,
      borderBottomColor: Colors(theme).lightgray,
      borderBottomWidth: 1,
      margin: 0,
    },
    menuItemText: {
      color: Colors(theme).text,
      fontWeight: "500",
    },
  });

export default stylesFn;
