import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.regular.backdrop,
  },
  modalContent: {
    justifyContent: 'center',
    backgroundColor: Colors.regular.white,
    padding: 20,
    borderRadius: 10,
    gap: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectTagButton: {
    alignItems: 'flex-start',
    backgroundColor: Colors.regular.aliceBlue,
    borderRadius: 70,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  tagMenuContent: {
    backgroundColor: Colors.regular.white,
  },
  menuItem: {
    backgroundColor: Colors.regular.white,
  },
  menuItemText: {
    color: Colors.regular.black,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
});

export default styles;
