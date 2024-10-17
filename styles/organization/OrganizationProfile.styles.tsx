import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) => StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    padding: 20,
    paddingTop: 0,
    gap: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors(theme).white,
    width: '100%',
  },
  row: {
    gap: 20,
  },
  image: {
    borderRadius: 75,
    width: 100,
    height: 100,
    borderColor: Colors(theme).primary,
    borderWidth: 5,
  },
  imagePickerContainer: {
    alignItems: 'center',
  },
});

export default stylesFn;
