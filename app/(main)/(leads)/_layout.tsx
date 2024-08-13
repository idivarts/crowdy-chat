import { DrawerToggle } from '@/components/ui';
import { useBreakPoints } from '@/hooks';
import { Stack } from 'expo-router';

const LeadsLayout = () => {
  const { lg } = useBreakPoints();

  return (
    <Stack
      screenOptions={{
        animation: 'ios',
        headerShown: false,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="leads"
        options={{
          headerLeft: () => lg ? null : <DrawerToggle />,
          title: 'Leads',
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
