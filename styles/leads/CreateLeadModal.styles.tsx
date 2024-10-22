import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Theme } from '@react-navigation/native';

const stylesFn = (theme: Theme) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors(theme).backdrop,
  },
  modalContent: {
    justifyContent: 'center',
    backgroundColor: Colors(theme).white,
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
    backgroundColor: Colors(theme).aliceBlue,
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
    backgroundColor: Colors(theme).white,
  },
  menuItem: {
    backgroundColor: Colors(theme).white,
  },
  menuItemText: {
    color: Colors(theme).black,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
  },
});

export default stylesFn;
