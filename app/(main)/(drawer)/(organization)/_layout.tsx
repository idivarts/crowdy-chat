import { DrawerToggle } from '@/components/ui';
import { useBreakPoints } from '@/hooks';
import { Stack } from 'expo-router';

const OrganizationLayout = () => {
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
        name="organization-profile"
        options={{
          headerLeft: () => lg ? null : <DrawerToggle />,
        }}
      />
    </Stack>
  );
};

export default OrganizationLayout;
