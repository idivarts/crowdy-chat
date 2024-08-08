import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuContainer: {
    position: 'relative',
  },
  menuTrigger: {
  },
  menuOptions: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1001,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    width: 140,
  },
  menuOption: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
});

export default styles;
