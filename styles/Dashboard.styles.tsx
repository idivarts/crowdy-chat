import { StyleSheet } from "react-native";
export const CreateCampaignstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    maxHeight: "80%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  steps: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  stepContainer: {
    marginBottom: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    width: "100%",
    marginVertical: 8,
  },
  stageContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    width: "100%",
    marginVertical: 8,
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  step3Container: {
    flexDirection: "row",
    width: "100%",
  },
  sidebar: {
    width: "30%",
    marginRight: 16,
  },
  sidebarItem: {
    marginVertical: 4,
    borderRadius: 4,
    color: "#fff",
  },
  mainContent: {
    flex: 1,
  },
  BottomRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  modalContent: {
    paddingBottom: 16,
  },
  stageActive: {
    backgroundColor: "#101010",
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
  stageInactive: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
});
