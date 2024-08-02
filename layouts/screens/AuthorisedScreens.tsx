import { Stack } from "expo-router";

const AuthorisedScreens = () => (
  <>
    <Stack.Screen name="(main)" options={{ headerShown: false }} />
  </>
);

export default AuthorisedScreens;
