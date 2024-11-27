import Colors from "@/constants/Colors";
import { StyleConstant } from "@/constants/Style";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    scrollViewContent: {
      flex: 1,
      alignItems: "center",
    },
    container: {
      padding: StyleConstant.paddingHorizontalForScreen,
      gap: 20,
      width: "100%",
    },
    row: {
      alignItems: "center",
      gap: 20,
    },
    imagePickerContainer: {
      alignItems: "center",
    },
    flex: {
      flex: 1,
    },
  });

export default stylesFn;
