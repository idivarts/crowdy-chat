import { useBreakPoints } from "@/hooks";
import { Stack } from "expo-router";

const DrawerLayout = () => {
  const { lg } = useBreakPoints();
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
      <Stack.Screen
        name="(organization)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default DrawerLayout;
