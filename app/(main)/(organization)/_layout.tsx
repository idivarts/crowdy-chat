import { DrawerToggle } from '@/components/ui';
import { useBreakPoints } from '@/hooks';
import { Stack } from 'expo-router';

const OrganizationLayout = () => {
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
        name="create-existing-organization"
        options={{
          headerLeft: () => lg ? null : <DrawerToggle />,
          title: 'Create New Organization',
        }}
      />
      <Stack.Screen
        name="organization-profile"
        options={{
          headerLeft: () => lg ? null : <DrawerToggle />,
          title: 'Organization Profile',
        }}
      />
    </Stack>
  );
};

export default OrganizationLayout;
