import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import { Stack } from "expo-router";

const OpenAILayout = () => {
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
        name="open-ai"
        options={{
          headerLeft: () => (lg ? null : <DrawerToggle />),
          title: "OpenAI",
        }}
      />
    </Stack>
  );
};

export default OpenAILayout;
