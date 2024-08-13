import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.regular.platinum,
  },
  headerText: {
    flex: 1,
    fontWeight: 500,
  },
  headerAction: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    fontWeight: 500,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  checkbox: {
    width: 48,
  },
  rowText: {
    flex: 1,
  },
});

export default styles;
