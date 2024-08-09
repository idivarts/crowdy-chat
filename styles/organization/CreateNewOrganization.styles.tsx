import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    padding: 20,
    gap: 20,
    backgroundColor: Colors.regular.white,
    width: '100%',
  },
  row: {
    alignItems: 'center',
    gap: 20,
  },
  imagePickerContainer: {
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
});

export default styles;
