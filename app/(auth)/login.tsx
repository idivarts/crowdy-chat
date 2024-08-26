import { useAuthContext } from "@/contexts";
import LoginUI from "@/shared-uis/components/AuthenticationUI/LoginUI";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { styles } from "@/styles/Login.styles";
import { useRouter } from "expo-router";

interface LoginData {
  emailOrUsername: string;
  password: string;
}

const Login = () => {
  const { signIn } = useAuthContext();

  return (
    <LoginUI
      styles={styles}
      formData={{}}
      error={""}
      handleChange={function (field: string, value: any): void {
        throw new Error("Function not implemented.");
      }}
      handleSubmit={(data: LoginData) => {
        signIn(data.emailOrUsername, data.password);
      }}
    />
  );
};

export default Login;
