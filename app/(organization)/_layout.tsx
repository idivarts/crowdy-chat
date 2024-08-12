import { View } from "@/components/Themed";
import { useAuthContext } from "@/contexts";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const OrganizationLayout = () => {
  const { isLoading, session } = useAuthContext()
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
              headerShown: true,
              title: "Create New Organization",
              headerTitleAlign: "center",
            }}
          />
        </Stack>
      </View>
    </>
  );
};

export default OrganizationLayout;
