import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
  menuStyle: {
  },
  menuContentStyle: {
    backgroundColor: Colors.regular.white,
    padding: 0,
  },
  menuItem: {
    margin: 0,
    backgroundColor: Colors.regular.white,
    borderBottomColor: Colors.regular.lightgray,
    borderBottomWidth: 1,
  },
  menuItemText: {
    color: Colors.regular.black,
  },
});

export default styles;
