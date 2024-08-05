import { DrawerToggle } from '@/components/ui';
import { useBreakPoints } from '@/hooks';
import { Stack } from 'expo-router';

const SourcesLayout = () => {
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
        name="sources"
        options={{
          headerLeft: () => lg ? null : <DrawerToggle />,
          title: 'Sources',
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
