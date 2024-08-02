import { Stack } from 'expo-router';
import 'react-native-reanimated';

const SourcesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="source"
        options={{
          headerBackTitleVisible: false,
          title: 'Source',
        }}
      />
    </Stack>
  );
};

export default SourcesLayout;
