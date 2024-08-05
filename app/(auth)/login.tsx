import { useAuthContext } from "@/contexts";
import LoginUI from "@/shared-uis/components/AuthenticationUI/LoginUI";
import { styles } from "@/styles/Login.styles";

const Login = () => {
  const { signIn } = useAuthContext()
  return (
    <LoginUI
      styles={styles}
      formData={{}}
      error={""}
      handleChange={function (field: string, value: any): void {
        throw new Error("Function not implemented.");
      }}
      handleSubmit={function (): void {
        // throw new Error("Function not implemented.");
        signIn()
      }}
    />
  );
};

export default Login;
