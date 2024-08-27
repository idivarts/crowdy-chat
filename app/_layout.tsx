import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme as ExpoDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { useColorScheme } from "@/components/useColorScheme";
import {
  AuthContextProvider,
  useAuthContext,
} from "@/contexts/auth-context.provider";
import { PaperProvider } from "react-native-paper";
import { AuthScreens, MainScreens, PublicScreens } from "@/layouts/screens";
import CustomPaperTheme from "@/constants/Theme";
import { OrganizationContextProvider } from "@/contexts/organization-context.provider";
import { FirebaseStorageContextProvider } from "@/contexts/firebase-storage-context.provider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      onSurface: string;
    }
  }
}

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
      <FirebaseStorageContextProvider>
        <OrganizationContextProvider>
          <PaperProvider theme={CustomPaperTheme}>
            <RootLayoutStack />
          </PaperProvider>
        </OrganizationContextProvider>
      </FirebaseStorageContextProvider>
    </AuthContextProvider>
  );
};

const RootLayoutStack = () => {
  const colorScheme = useColorScheme();
  const { session } = useAuthContext();

  // const router = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   // Redirect from root (/) to /login
  //   if (pathname === '/') {
  //     if (!session)
  //       router.replace('/(auth)/login');
  //     else
  //       router.replace('/(main)/compaigns');
  //   }
  // }, [router, session]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : ExpoDefaultTheme}>
      <Stack
        screenOptions={{
          animation: "ios",
          headerShown: false,
        }}
      >
        <PublicScreens />
        {session ? <MainScreens /> : <AuthScreens />}
      </Stack>
      <Toast />
    </ThemeProvider>
  );
};

export default RootLayout;
