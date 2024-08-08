import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: Colors.regular.primary,
    padding: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
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

export default styles;
