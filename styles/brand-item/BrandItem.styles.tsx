import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors(theme).aliceBlue,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  innerContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default stylesFn;
