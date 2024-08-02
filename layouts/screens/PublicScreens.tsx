import { Stack } from "expo-router";

const PublicScreens = () => (
  <>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    <Stack.Screen name="+not-found" />
  </>
);

export default PublicScreens;
