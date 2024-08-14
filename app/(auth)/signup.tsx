import { useAuthContext } from "@/contexts";
import SignupUI from "@/shared-uis/components/AuthenticationUI/SignupUI";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { styles } from "@/styles/Signup.styles";
import { useRouter } from "expo-router";

interface SignupData {
  email: string;
  password: string;
}

const Signup = () => {
  const { signIn } = useAuthContext();
  const router = useRouter();

  return (
    <SignupUI
      styles={styles}
      formData={{}}
      error={""}
      handleChange={function (field: string, value: any): void {
        throw new Error("Function not implemented.");
      }}
      handleSubmit={(data: SignupData) => {
        signIn();
        console.log("Signup data:", data);
        Toaster.success("Signed Up Successfully!");
        router.replace("/(main)/(campaigns)/campaigns");
      }}
    />
  );
};

export default Signup;
