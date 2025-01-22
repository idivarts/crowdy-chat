import { Stack } from "expo-router";

const ScreenLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "ios",
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="(campaigns)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ScreenLayout;
