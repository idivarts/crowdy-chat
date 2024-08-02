import { Stack } from "expo-router";

const AuthenticationScreens = () => (
  <>
    <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
  </>
);

export default AuthenticationScreens;
