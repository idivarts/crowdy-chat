import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) => StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors(theme).aliceBlue,
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 14,
    color: Colors(theme).primary,
  },
  checkboxContainer: {
    justifyContent: "center",
  },
  checkboxText: {},
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontWeight: 500,
    fontSize: 14,
    color: Colors(theme).primary,
  },
  rowContainer: {
    padding: 10,
    minHeight: 55,
  },
  rowTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 36,
    paddingVertical: 0,
  },
  rowText: {
    fontWeight: 400,
  },
});

export default stylesFn;
