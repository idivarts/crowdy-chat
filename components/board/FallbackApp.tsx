import React from 'react'
import { Text, View } from 'react-native'
import EditScreenInfo from '../EditScreenInfo'
import { SafeAreaView } from 'react-native-safe-area-context'

const FallbackApp = () => {
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

export default FallbackApp