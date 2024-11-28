import Colors from "@/constants/Colors";
import { StyleConstant } from "@/constants/Style";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    cardContainer: {
      borderColor: Colors(theme).aliceBlue,
      borderWidth: 1,
      borderRadius: 8,
      padding: StyleConstant.paddingHorizontalForScreen,
      marginBottom: 16,
      shadowColor: Colors(theme).black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
      zIndex: 1,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      zIndex: 2,
    },
    campaignImage: {
      width: 50,
      height: 50,
      borderRadius: 8,
      marginRight: 16,
    },
    cardHeaderContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      zIndex: 3,
    },
    cardHeaderText: {
      flex: 1,
      gap: 2,
    },
    campaignName: {
      fontSize: 18,
      fontWeight: "bold",
    },
    chatAssistantIdContainer: {
      flexDirection: "row",
      width: "70%",
      alignItems: "center",
    },
    chatAssistantId: {
      marginRight: 8,
    },
    copyIdIcon: {
      marginTop: 4,
      color: Colors(theme).text,
    },
    cardBody: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
      gap: 8,
      flexWrap: "wrap",
    },
    analyticsCard: {
      flexDirection: "row",
      alignItems: "center",
    },
    analyticsCardTitle: {
      fontWeight: 500,
    },
    cardFooter: {
      alignItems: "flex-end",
    },
  });

export default stylesFn;
