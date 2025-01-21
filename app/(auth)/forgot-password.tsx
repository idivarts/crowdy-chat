import { useState } from "react";
import { Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { z } from "zod";

import { useAuthContext } from "@/contexts";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import TextInput from "@/components/ui/text-input/TextInput";
import Button from "@/components/ui/button/Button";
import { useBreakPoints } from "@/hooks";
import { stylesFn } from "@/styles/Auth.styles";

const forgotPasswordSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
});

interface ForgotPasswordData {
  email: string;
}

const ForgotPassword = () => {
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: "",
  });
  const [error, setError] = useState("");

  const { forgotPassword } = useAuthContext();
  const theme = useTheme();
  const styles = stylesFn(theme);

  const { lg } = useBreakPoints();

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const forgotPasswordData = forgotPasswordSchema.safeParse(formData);

    if (!forgotPasswordData.success) {
      setError("Invalid email");
    } else {
      forgotPassword(formData.email);
    }
  };

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
        <Text style={styles.title}>Forgot Password</Text>
        {
          error ? <Text style={styles.error}>{error}</Text> : null
        }
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          accessibilityLabel="Email Input"
        />
        <Button
          onPress={handleSubmit}
        >
          Reset Password
        </Button>
        <View style={styles.linksContainer}>
          <Link href={"/login"} style={styles.link}>
            <Text>Back to Login</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
