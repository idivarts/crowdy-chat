import { Stack } from "expo-router";

const PublicScreens = () => (
  <Stack
    screenOptions={{
      animation: "ios",
    }}
  >
    <Stack.Screen name="+not-found" />
  </Stack>
);

export default PublicScreens;
