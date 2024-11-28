import { Stack } from "expo-router";

const MainScreens = () => {
  return (
    <Stack
      screenOptions={{
        animation: "ios",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(drawer)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(screens)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default MainScreens;
