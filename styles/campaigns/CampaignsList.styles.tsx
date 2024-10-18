import Colors from "@/constants/Colors";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const stylesFn = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  campaignsSection: {
    flex: 1,
    marginTop: 16,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 300,
    height: 300,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 16,
  },
  filledStateContainer: {
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
});

export default stylesFn;
