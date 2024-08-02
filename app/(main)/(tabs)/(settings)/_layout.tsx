import { Stack } from 'expo-router';
import 'react-native-reanimated';

const SettingsLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: 'ios',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
