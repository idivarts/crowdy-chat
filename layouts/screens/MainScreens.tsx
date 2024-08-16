import { Stack } from "expo-router";

const MainScreens = () => (
  <Stack
    screenOptions={{
      animation: "ios",
    }}
  >
    <Stack.Screen name="(main)" options={{ headerShown: false }} />
    <Stack.Screen name="(organization)" options={{ headerShown: false }} />
    <Stack.Screen name="(campaigns)" options={{ headerShown: false }} />
  </Stack>
);

export default MainScreens;
