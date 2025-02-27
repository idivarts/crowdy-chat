import { View } from "@/components/Themed";
import AppLayout from "@/layouts/app-layout";
import Header from "@/layouts/header";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <AppLayout>
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
    </AppLayout>
  );
};

export default AuthLayout;
