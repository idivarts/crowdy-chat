import { useAuthContext } from "@/contexts";
import SignupUI from "@/shared-uis/components/AuthenticationUI/SignupUI";
import { stylesFn } from "@/styles/Signup.styles";
import { useTheme } from "@react-navigation/native";

interface SignupData {
  email: string;
  password: string;
}

const Signup = () => {
  const { signUp } = useAuthContext();
  const theme = useTheme();
  const styles = stylesFn(theme);

  return (
    <SignupUI
      styles={styles}
      formData={{}}
      error={""}
      handleChange={function (field: string, value: any): void {
        throw new Error("Function not implemented.");
      }}
      handleSubmit={(data: SignupData) => {
        signUp(data.email, data.password);
      }}
    />
  );
};

export default Signup;
