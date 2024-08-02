import { Stack } from 'expo-router';
import 'react-native-reanimated';

const CampaignsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="campaign"
        options={{
          headerBackTitleVisible: false,
          title: 'Campaign',
        }}
      />
    </Stack>
  );
};

export default CampaignsLayout;
