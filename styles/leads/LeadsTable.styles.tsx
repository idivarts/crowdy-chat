import Colors from "@/constants/Colors";
import CustomPaperTheme from "@/constants/Theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.regular.aliceBlue,
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 14,
    color: CustomPaperTheme.colors.primary,
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
    color: CustomPaperTheme.colors.primary,
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

export default styles;
