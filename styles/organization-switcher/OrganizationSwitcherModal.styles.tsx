import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet, Dimensions } from "react-native";

export const stylesFn = (theme: Theme) => StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    width: 300,
    borderWidth: 0,
  },
  card: {
    width: "100%",
    backgroundColor: Colors(theme).background,
    padding: 10,
  },
  cardContent: {
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  organizationCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  organizationName: {
    marginLeft: 10,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
});
