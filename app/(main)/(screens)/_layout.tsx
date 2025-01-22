import { Stack } from "expo-router";

const DrawerLayout = () => {
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

export default DrawerLayout;
