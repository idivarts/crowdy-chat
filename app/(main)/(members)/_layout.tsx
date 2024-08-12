import { DrawerToggle } from "@/components/ui";
import { useBreakPoints } from "@/hooks";
import { Stack } from "expo-router";

const MembersLayout = () => {
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
        name="members"
        options={{
          headerShown: false,
          title: "Members",
        }}
      />
    </Stack>
  );
};

export default MembersLayout;
