import ForgotPasswordUI from "@/shared-uis/components/AuthenticationUI/ForgotPasswordUI";
import { styles } from "@/styles/ForgotPassword.styles";

const ForgotPassword = () => {
  return (
    <ForgotPasswordUI
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

export default ForgotPassword;
