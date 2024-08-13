import { StyleSheet } from "react-native";
export const CreateCampaignstyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
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
    padding: 16,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  stepContainer2: {
    padding: 16,

    width: "100%",
    textAlign: "left",
    flex: 1,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    marginVertical: 8,
    // width: 200,
  },
  inputcampaign1: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    marginVertical: 8,
    width: 300,
  },
  inputTextcampaign1: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    marginVertical: 8,
    width: 150,
  },
  stageContainer: {
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    width: "100%",
    marginVertical: 8,
    gap: 18,
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
    marginVertical: 8,
    resizeMode: "contain",
    padding: 0,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  rowCampaignOne: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  step3Container: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
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
    height: 40,
    marginVertical: 8,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
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
  },
  stageActive: {
    backgroundColor: "#2196F3",
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
    width: "100%",
    display: "flex",
  },
  textAreaStage3: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    width: "50%",
    marginVertical: 8,
  },
  removeCollectible: {
    backgroundColor: "#2196F3",
    padding: 8,
    color: "#fff",
  },
});
