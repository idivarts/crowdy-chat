import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  popup: {
    // width: "100%",
    width: 400,
    padding: 40,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    width: "90%",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
});
