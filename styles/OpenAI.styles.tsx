import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const stylesFn = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%",
    maxWidth: 400,
    elevation: 4,
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
