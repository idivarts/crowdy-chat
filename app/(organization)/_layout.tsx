import { View } from "@/components/Themed";
import GoBackButton from "@/components/ui/go-back-button";
import { useAuthContext, useOrganizationContext } from "@/contexts";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const OrganizationLayout = () => {
  const { isLoading, session } = useAuthContext()
  const { organizations } = useOrganizationContext()
  const router = useRouter()
  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/(auth)/login")
    }
  }, [isLoading, session])

  return (
    <>
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
    </>
  );
};

export default OrganizationLayout;
