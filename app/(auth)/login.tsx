import { useAuthContext } from "@/contexts";
import LoginUI from "@/shared-uis/components/AuthenticationUI/LoginUI";
import { styles } from "@/styles/Login.styles";
import { useRouter } from "expo-router";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn } = useAuthContext();
  const router = useRouter();

  return (
    <LoginUI
      styles={styles}
      formData={{}}
      error={""}
      handleChange={function (field: string, value: any): void {
        throw new Error("Function not implemented.");
      }}
      handleSubmit={(data: any) => {
        signIn();
        console.log("Signin data:", data);
        toast.success("Logged In Successfully!");
        router.replace("/(main)/(campaigns)/campaigns");
      }}
    />
  );
};

export default Login;
