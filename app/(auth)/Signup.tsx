import { useAuthContext } from "@/contexts";
import SignupUI from "@/shared-uis/components/AuthenticationUI/SignupUI";
import { styles } from "@/styles/Signup.styles";
import { useRouter } from "expo-router";
import { toast } from "react-toastify";

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
      handleSubmit={(data: any) => {
        signIn();
        console.log("Signup data:", data);
        toast.success("Account created!");
        router.replace("/(main)/(campaigns)/campaigns");
      }}
    />
  );
};

export default Signup;
