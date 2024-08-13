import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.regular.backdrop,
  },
  modalContent: {
    justifyContent: 'center',
    backgroundColor: Colors.regular.white,
    padding: 20,
    borderRadius: 10,
    width: '40%',
    gap: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
});

export default styles;
