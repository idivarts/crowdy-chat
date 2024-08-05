import LoginUI from "@/shared-uis/components/AuthenticationUI/LoginUI";
import { styles } from "@/styles/Login.styles";

const Login = () => {
  return (
    <LoginUI
      styles={styles}
      formData={{}}
      error={""}
      handleChange={function (field: string, value: any): void {
        throw new Error("Function not implemented.");
      }}
      handleSubmit={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default Login;
