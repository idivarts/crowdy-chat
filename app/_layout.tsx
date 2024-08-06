import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useColorScheme } from '@/components/useColorScheme';
import { AuthContextProvider, useAuthContext } from '@/contexts/auth-context.provider';
import { AuthScreens, MainScreens, PublicScreens } from '@/layouts/screens';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <RootLayoutStack />
    </AuthContextProvider>
  );
}

const RootLayoutStack = () => {
  const colorScheme = useColorScheme();
  const { session } = useAuthContext();

  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    // Redirect from root (/) to /login
    if (pathname === '/') {
      if (!session)
        router.replace('/(auth)/login');
      else
        router.replace('/(main)/compaigns');
    }
  }, [router, session]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          animation: 'ios',
          headerShown: false,
        }}
      >
        <PublicScreens />
        {session ? <MainScreens /> : <AuthScreens />}
      </Stack>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default RootLayout;
