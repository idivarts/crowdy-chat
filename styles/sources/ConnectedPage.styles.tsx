import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 0.5,
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flex: 2,
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 5,
    color: "#007bff",
  },
  underline: {
    textDecorationLine: "underline",
  },
  owner: {
    fontSize: 14,
    fontWeight: "500",
  },
  platform: {
    fontSize: 12,
    color: "#666",
  },
  iconButton: {
    marginHorizontal: 5,
  },
});
