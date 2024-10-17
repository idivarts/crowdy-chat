import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";

const stylesFn = (theme: Theme) => StyleSheet.create({
  menuStyle: {
  },
  menuContentStyle: {
    backgroundColor: Colors(theme).white,
    borderRadius: 8,
    borderTopColor: Colors(theme).lightgray,
    borderTopWidth: 1,
    overflow: "hidden",
    paddingVertical: 0,
  },
  menuItem: {
    backgroundColor: Colors(theme).white,
    borderBottomColor: Colors(theme).lightgray,
    borderBottomWidth: 1,
    margin: 0,
  },
  menuItemText: {
    color: Colors(theme).black,
    fontWeight: "500",
  },
});

export default stylesFn;
