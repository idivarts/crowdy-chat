import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) => StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  headerSection: {
    flexDirection: 'row',
  }
});

export default stylesFn;
