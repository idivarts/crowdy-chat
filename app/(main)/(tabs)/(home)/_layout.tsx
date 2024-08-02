import { Stack } from 'expo-router';
import 'react-native-reanimated';

const HomeLayout = () => {
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

export default HomeLayout;
