import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 16,
    color: Colors.regular.black,
  },
  input: {
    height: 40,
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: Colors.regular.lightgray,
    padding: 10,
    fontSize: 16,
    backgroundColor: Colors.regular.white,
  },
  textArea: {
    height: 100,
  },
});

export default styles;
