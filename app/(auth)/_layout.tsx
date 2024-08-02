import { useAuthContext } from '@/contexts';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

const AuthLayout = () => {
  const { session } = useAuthContext();

  // useEffect(() => {
  //   if (session) {
  //     router.replace('(main)/(tabs)');
  //   }
  // }, [session]);

  return (
    <Stack
      screenOptions={{
        animation: 'ios',
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
