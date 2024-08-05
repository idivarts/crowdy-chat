import DrawerToggle from '@/components/ui/drawer-toggle';
import { useBreakPoints } from '@/hooks';
import { Stack } from 'expo-router';

const CampaignsLayout = () => {
  const { lg } = useBreakPoints();

  return (
    <Stack
      screenOptions={{
        animation: 'ios',
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="campaigns"
        options={{
          headerLeft: () => lg ? null : <DrawerToggle />,
          title: 'Campaigns',
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
