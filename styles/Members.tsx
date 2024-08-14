import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  searchInput: {
    marginBottom: 16,
  },
  scrollView: {
    height: Dimensions.get("window").height - 200,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  actionsCell: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalInputContainer: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  chip: {
    margin: 4,
  },
  addButton: {
    marginTop: 10,
  },
});
