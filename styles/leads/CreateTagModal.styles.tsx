import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";

const stylesFn = (theme: Theme) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors(theme).backdrop,
  },
  modalContent: {
    justifyContent: 'center',
    backgroundColor: Colors(theme).background,
    padding: 20,
    borderRadius: 10,
    width: '40%',
    gap: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors(theme).text,
  },
  actions: {
    backgroundColor: Colors(theme).background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
  },
});

export default stylesFn;
