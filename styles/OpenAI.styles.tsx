import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    elevation: 4,
    backgroundColor: "#ffffff",
    borderRadius: 12,
  },
  cardTitle: {
    color: "#2196F3", // Default blue color
    fontWeight: "bold",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
  },
  cardActions: {
    justifyContent: "center",
    paddingBottom: 16,
  },
  button: {
    width: "50%",
    borderRadius: 25,
    backgroundColor: "#2196F3",
    color: "#FFF",
  },
});
