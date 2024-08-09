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
  modalContent: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalInputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  input: {
    marginBottom: 16,
    width: "100%",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  addButton: {
    marginTop: 16,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  scrollView: {
    height: Dimensions.get("window").height - 200,
  },
  actionsCell: {},
});
