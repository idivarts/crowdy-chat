import { View } from "@/components/Themed";
import Header from "@/layouts/header";
import { Stack } from "expo-router";

const AuthLayout = () => {
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
            name="ForgotPassword"
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
