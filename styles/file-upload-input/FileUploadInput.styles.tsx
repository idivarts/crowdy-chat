import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderColor: Colors.regular.lightgray,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  innerContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  descriptionText: {
    textAlign: 'center',
  },
});

export default styles;
