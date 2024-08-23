import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import { Stack } from "expo-router";
import CustomHeader from "@/components/ui/custom-header";

const SourcesLayout = () => {
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
        name="sources"
        options={{
          headerShown: false,
          title: "Sources",
        }}
      />
    </Stack>
  );
};

export default SourcesLayout;
