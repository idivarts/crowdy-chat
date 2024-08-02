import { Stack } from 'expo-router';
import 'react-native-reanimated';

const LeadsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="lead"
        options={{
          headerBackTitleVisible: false,
          title: 'Lead',
        }}
      />
    </Stack>
  );
};

export default LeadsLayout;
