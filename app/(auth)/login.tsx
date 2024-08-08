import { useAuthContext } from "@/contexts";
import LoginUI from "@/shared-uis/components/AuthenticationUI/LoginUI";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { styles } from "@/styles/Login.styles";
import { useRouter } from "expo-router";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const { signIn } = useAuthContext();
  const router = useRouter();

  return (
    <LoginUI
      styles={styles}
      formData={{}}
      error={""}
      handleChange={function (field: string, value: any): void {
        throw new Error("Function not implemented.");
      }}
      handleSubmit={(data: LoginData) => {
        signIn();
        console.log("Signin data:", data);
        Toaster.success("Signed In Successfully!");
        router.replace("/(main)/(campaigns)/campaigns");
      }}
    />
  );
};

export default Login;
