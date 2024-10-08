import { View } from "@/components/Themed";
import { useAuthContext } from "@/contexts";
import Header from "@/layouts/header";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const AuthLayout = () => {
  const { isLoading, session } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && session) {
      router.replace("/(main)/(campaigns)/campaigns");
    }
  }, [isLoading, session]);

  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
        }}
      >
        <Stack
          screenOptions={{
            animation: "ios",
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="forgot-password"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </>
  );
};

export default AuthLayout;
