import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
  menuStyle: {
  },
  menuContentStyle: {
    backgroundColor: Colors.regular.white,
    borderRadius: 8,
    borderTopColor: Colors.regular.lightgray,
    borderTopWidth: 1,
    overflow: "hidden",
    paddingVertical: 0,
  },
  menuItem: {
    backgroundColor: Colors.regular.white,
    borderBottomColor: Colors.regular.lightgray,
    borderBottomWidth: 1,
    margin: 0,
  },
  menuItemText: {
    color: Colors.regular.black,
    fontWeight: "500",
  },
});

export default styles;
