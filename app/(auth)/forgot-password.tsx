import ForgotPasswordUI from "@/shared-uis/components/AuthenticationUI/ForgotPasswordUI";
import { styles } from "@/styles/ForgotPassword.styles";
import { useAuthContext } from "@/contexts";

interface ForgotPasswordData {
  email: string;
}

const ForgotPassword = () => {
  const { forgotPassword } = useAuthContext();

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
