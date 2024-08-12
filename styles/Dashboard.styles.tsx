import { StyleSheet } from "react-native";
export const CreateCampaignstyles = StyleSheet.create({
  container: {},
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
    height: "90%",
    position: "absolute",
    bottom: 0,
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
    // marginBottom: 16,
    padding: 16,
    // alignItems: "center",
    // width: "80%",
    textAlign: "left",
    flex: 1,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    // padding: 8,
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
    width: "100%",
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    display: "flex",
    width: "50%",
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
  input3: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
    marginVertical: 8,
  },
  mainContent: {
    flex: 1,
  },
  BottomRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "flex-end",
  },
  modalContent: {
    paddingBottom: 16,
    // justifyContent: "center",
    // alignItems: "center",
  },
  stageActive: {
    backgroundColor: "#101010",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 4,
  },
  stageInactive: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
  activeProgressDot: {
    backgroundColor: "blue",
  },
  rowStage3: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
});
