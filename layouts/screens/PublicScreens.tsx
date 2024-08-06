import { Stack } from "expo-router";
import { Platform } from "react-native";

const PublicScreens = () => {
  const isWeb = Platform.OS === "web";

  return (
    <Stack
      screenOptions={{
        animation: "ios",
      }}
    >
      { isWeb ? <Stack.Screen name="index" /> : null }
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default PublicScreens;
