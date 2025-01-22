import { useState } from "react";
import { Link, Stack } from "expo-router";

import { Text, View } from "@/components/Themed";
import Button from "@/components/ui/button/Button";
import TextInput from "@/components/ui/text-input/TextInput";
import { useAuthContext } from "@/contexts";
import { stylesFn } from "@/styles/Auth.styles";
import { useTheme } from "@react-navigation/native";

import { z } from "zod";
import { useBreakPoints } from "@/hooks";
import { Image } from "react-native";

const signupSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email")
    .refine((email) => {
      const personalEmailDomains = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
      ];
      const domain = email.split("@")[1];
      return !personalEmailDomains.includes(domain);
    }, "Please use your work email"),
  password: z.string().nonempty("Password is required"),
});

interface SignupData {
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const theme = useTheme();
  const styles = stylesFn(theme);
  const { lg } = useBreakPoints();

  const { signUp } = useAuthContext();

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const signupData = signupSchema.safeParse(formData);

    if (!signupData.success) {
      setError("Invalid email or password");
    } else {
      signUp(formData.email, formData.password);
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
        <Text style={styles.title}>Sign Up</Text>
        {
          error ? <Text style={styles.error}>{error}</Text> : null
        }
        <TextInput
          style={styles.input}
          placeholder="Work Email"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          accessibilityLabel="Work Email Input"
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
          Sign Up
        </Button>
        <View style={styles.linksContainer}>
          <Link href={"/login"} style={styles.link}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Signup;
