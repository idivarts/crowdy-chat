import { View } from "@/components/Themed";
import GoBackButton from "@/components/ui/go-back-button";
import { useOrganizationContext } from "@/contexts";
import { Stack } from "expo-router";

const OrganizationLayout = () => {
  const { organizations } = useOrganizationContext()

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack
        screenOptions={{
          animation: "ios",
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="create-new-organization"
          options={{
            headerLeft: () => organizations.length === 0 ? null : <GoBackButton />,
            headerShown: true,
            headerTitleAlign: "center",
            title: "Create New Organization",
          }}
        />
      </Stack>
    </View>
  );
};

export default OrganizationLayout;
