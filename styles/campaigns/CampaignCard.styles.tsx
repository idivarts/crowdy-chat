import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 999,
  },
  campaignImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  cardHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 1000,
  },
  cardHeaderText: {
    flex: 1,
  },
  campaignName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatAssistantIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatAssistantId: {
    marginRight: 8,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  analyticsCard: {
    alignItems: 'center',
  },
  cardFooter: {
    alignItems: 'center',
  },
  campaignBoardButton: {
    backgroundColor: Colors.regular.primary,
    padding: 12,
    borderRadius: 8,
  },
  campaignBoardButtonText: {
    color: '#fff',
  },
});

export default styles;