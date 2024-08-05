import SignupUI from "@/shared-uis/components/AuthenticationUI/SignupUI";
import { styles } from "@/styles/Signup.styles";

const Signup = () => {
  return (
    <SignupUI
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

export default Signup;
