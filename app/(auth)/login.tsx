import { useAuthContext } from "@/contexts";
import LoginUI from "@/shared-uis/components/AuthenticationUI/LoginUI";
import { stylesFn } from "@/styles/Login.styles";
import { useTheme } from "@react-navigation/native";

interface LoginData {
  emailOrUsername: string;
  password: string;
}

const Login = () => {
  const { signIn } = useAuthContext();
  const theme = useTheme();
  const styles = stylesFn(theme);

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
