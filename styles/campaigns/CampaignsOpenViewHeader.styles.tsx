import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
      paddingRight: 6,
    },
    tabButtonsContainer: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      gap: 12,
    },
    button: {
      borderRadius: 50,
    },
    searchContainer: {
      flexDirection: "row",
      flexGrow: 1,
      backgroundColor: Colors(theme).background,
    },
    searchInput: {
      width: "100%",
      backgroundColor: Colors(theme).background,
    },
    pageInput: {
      marginTop: 6,
    },
  });

export default stylesFn;
