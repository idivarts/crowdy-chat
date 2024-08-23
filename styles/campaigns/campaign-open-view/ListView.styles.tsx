import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  tableContainer: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 16,
  },
  groupByContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerCell: {
    paddingHorizontal: 16,
    borderWidth: 0.1,
    borderColor: "#e0e0e0",
    minWidth: 120,
  },
  cell: {
    paddingHorizontal: 16,
    minWidth: 120,
    borderWidth: 0.1,
    borderColor: "#e0e0e0",
  },
  row: {
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "column",
  },
  userName: {
    fontWeight: "bold",
  },
  userHandle: {
    fontSize: 12,
    color: "#666",
  },
  timeAgo: {
    color: Colors.regular.primary,
    fontSize: 12,
  },
  sortIcon: {},
});
