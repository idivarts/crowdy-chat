import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    paddingRight: 6,
    paddingBottom: 10,
  },
  tabButtonsContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  button: {
    borderRadius: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  searchInput: {
    width: '100%',
  },
  pageInput: {
    marginTop: 6,
  },
});

export default styles;
