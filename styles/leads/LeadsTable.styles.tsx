import Colors from "@/constants/Colors";
import CustomPaperTheme from "@/constants/Theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    backgroundColor: Colors.regular.aliceBlue,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 36,
    paddingVertical: 0,
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 14,
    color: CustomPaperTheme.colors.primary,
  },
  checkboxContainer: {
    maxWidth: 36,
    maxHeight: 36,
    justifyContent: 'center',
    paddingVertical: 0,
  },
  checkboxText: {
    minWidth: 36,
    minHeight: 36,
  },
  actionContainer: {
    minWidth: 90,
    maxWidth: 90,
    maxHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontWeight: 500,
    fontSize: 14,
    color: CustomPaperTheme.colors.primary,
  },
  rowContainer: {
    padding: 10,
  },
  rowTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 36,
    paddingVertical: 0,
  },
  rowText: {
    fontWeight: 400,
  },
});

export default styles;
