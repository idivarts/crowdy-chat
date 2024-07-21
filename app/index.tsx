import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
// import App from '@/components/board/App';

// const Component = Platform.select({
//   web: require('../components/board/App'),
//   default: require('../components/board/FallbackApp')
// })()

const Component = Platform.select({
  ios: () => require('../components/board/FallbackApp').default,
  android: () => require('../components/board/FallbackApp').default,
  default: () => require('../components/board/App').default
})();

export default function TabOneScreen() {

  return (
    <View>
      <Component />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
