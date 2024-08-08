import { useAuthContext } from "@/contexts";
import SignupUI from "@/shared-uis/components/AuthenticationUI/SignupUI";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { styles } from "@/styles/Signup.styles";
import { useRouter } from "expo-router";

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
      // @ts-ignore
      handleSubmit={(data: any) => {
        signIn();
        console.log("Signup data:", data);
        Toaster.success("Signed Up Successfully!");
        router.replace("/(main)/(campaigns)/campaigns");
      }}
    />
  );
};

export default Signup;
