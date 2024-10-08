import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    width: 300,
    borderWidth: 0,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
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
