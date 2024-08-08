import { DrawerToggle } from '@/components/ui';
import { useAuthContext } from '@/contexts';
import { useBreakPoints } from '@/hooks';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

const CampaignsLayout = () => {
  const { lg } = useBreakPoints();

  const { isLoading, session } = useAuthContext()
  const router = useRouter()
  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/(auth)/login")
    }
  }, [isLoading, session])

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
