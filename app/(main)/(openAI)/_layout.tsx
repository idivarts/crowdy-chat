import { DrawerToggle } from "@/components/ui";
import CustomHeader from "@/components/ui/custom-header";
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
          header: (props) => <CustomHeader {...props} title="OpenAI" />,
          title: "OpenAI",
        }}
      />
    </Stack>
  );
};
export default OpenAILayout;
