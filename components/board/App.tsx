import React from 'react'
import EditScreenInfo from '../EditScreenInfo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from '../Themed'

const App = () => {
  return (
    <SafeAreaView>
      <View >
        <Text >Tab One</Text>
        {/* <View /> */}
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </View>
    </SafeAreaView>
  )
}

export default App