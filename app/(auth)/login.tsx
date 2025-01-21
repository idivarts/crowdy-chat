import { useState } from "react";
import { Link, Stack } from "expo-router";

import { useAuthContext } from "@/contexts";
import { Text, View } from "@/components/Themed";
import TextInput from "@/components/ui/text-input/TextInput";
import Button from "@/components/ui/button/Button";
import { stylesFn } from "@/styles/Auth.styles";
import { useTheme } from "@react-navigation/native";
import { z } from "zod";
import { useBreakPoints } from "@/hooks";
import { Image } from "react-native";

const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

interface LoginData {
  emailOrUsername: string;
  password: string;
}

const Login = () => {
  const { signIn } = useAuthContext();
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [formData, setFormData] = useState<LoginData>({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { lg } = useBreakPoints();

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const loginData = loginSchema.safeParse(formData);

    if (!loginData.success) {
      setError("Invalid email or password");
    } else {
      signIn(formData.emailOrUsername, formData.password);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        source={require("@/assets/images/logo.jpg")}
        style={styles.logo}
      />
      <View
        style={[
          styles.formContainer,
          {
            width: lg ? 480 : "100%",
          }
        ]}
      >
        <Text style={styles.title}>Login</Text>
        {
          error ? <Text style={styles.error}>{error}</Text> : null
        }
        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          value={formData.emailOrUsername}
          onChangeText={(value) => handleChange("emailOrUsername", value)}
          keyboardType="email-address"
          accessibilityLabel="Email or Username Input"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
          accessibilityLabel="Password Input"
        />
        <Button
          onPress={handleSubmit}
        >
          Login
        </Button>
        <View style={styles.linksContainer}>
          <Link href={"/signup"} style={styles.link}>
            <Text>Don't have an account? Signup</Text>
          </Link>
          <Link href={"/forgot-password"}>
            <Text>Forgot Password?</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Login;
