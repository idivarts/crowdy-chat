import ForgotPasswordUI from "@/shared-uis/components/AuthenticationUI/ForgotPasswordUI";
import { stylesFn } from "@/styles/ForgotPassword.styles";
import { useAuthContext } from "@/contexts";
import { useTheme } from "@react-navigation/native";

interface ForgotPasswordData {
  email: string;
}

const ForgotPassword = () => {
  const { forgotPassword } = useAuthContext();
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <ForgotPasswordUI
      styles={styles}
      formData={{}}
      error={""}
      handleChange={function (field: string, value: any): void {
        throw new Error("Function not implemented.");
      }}
      handleSubmit={(data: ForgotPasswordData) => {
        forgotPassword(data.email);
      }}
    />
  );
};

export default ForgotPassword;
