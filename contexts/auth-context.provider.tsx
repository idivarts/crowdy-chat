import { useStorageState } from "@/hooks";
import { AuthApp } from "@/shared-libs/utilities/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut as signOutAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createContext, useContext, type PropsWithChildren } from "react";
import { setDoc, collection, doc, getDocs, where } from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { IUser } from "@/shared-libs/firestore/crowdy-chat/models/users";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { useRouter } from "expo-router";

interface AuthContextProps {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string) => void;
  forgotPassword: (email: string) => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  signIn: (email: string, password: string) => null,
  signOut: () => null,
  signUp: (email: string, password: string) => null,
  forgotPassword: (email: string) => null,
  session: null,
  isLoading: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [[isLoading, session], setSession] = useStorageState("");
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        AuthApp,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        Toaster.error(
          "Sign In Error",
          "Please verify your email address first."
        );
        return;
      }
      setSession(userCredential.user.uid);
      Toaster.success("Signed In Successfully!");
      router.replace("/(main)/(campaigns)/campaigns");
    } catch (error: any) {
      let errorMessage = "An unknown error occurred. Please try again.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "The password is incorrect.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many unsuccessful login attempts.";
          break;
        default:
          errorMessage = error.message;
      }

      Toaster.error("Sign In Error", errorMessage);
    }
  };

  const signOut = () => {
    setSession(null);
    signOutAuth(AuthApp);
    Toaster.success("Signed Out Successfully!");
  };

  const signUp = async (email: string, password: string) => {
    const user = await createUserWithEmailAndPassword(AuthApp, email, password)
      .then(async (userCredential) => {
        const colRef = collection(FirestoreDB, "users");
        const docRef = doc(colRef, userCredential.user.uid);

        let userData: IUser = {
          email: email,
        };

        await setDoc(docRef, userData);

        await sendEmailVerification(userCredential.user);
        Toaster.success(
          "Sign Up Successful",
          "A verification email has been sent to your email address."
        );

        const checkVerification = async () => {
          await userCredential.user.reload();
          if (userCredential.user.emailVerified) {
            setSession(userCredential.user.uid);
            Toaster.success(
              "Email Verified",
              "Your email has been successfully verified."
            );
            router.replace("/(main)/(campaigns)/campaigns");
          } else {
            setTimeout(checkVerification, 2000);
          }
        };

        checkVerification();
      })
      .catch((error) => {
        let errorMessage = "An unknown error occurred. Please try again.";
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "The email address is already in use.";
            break;
          case "auth/invalid-email":
            errorMessage = "The email address is not valid.";
            break;
          case "auth/weak-password":
            errorMessage = "The password is too weak.";
            break;
          default:
            errorMessage = error.message;
        }

        Toaster.error("Sign Up Error", errorMessage);
      });
  };

  const forgotPassword = async (email: string) => {
    try {
      //check from datastore collection
      // const userCollectionRef = collection(FirestoreDB, "user");
      // const emailQuery = query(userCollectionRef, where("email", "==", email));
      // const querySnapshot = await getDocs(emailQuery);
      // if (querySnapshot.empty) {
      //   Toaster.error(
      //     "Password Reset Error",
      //     "No account found with this email."
      //   );
      //   return;
      // }
      await sendPasswordResetEmail(AuthApp, email);
      Toaster.success(
        "Password Reset Email Sent",
        "A password reset email has been sent to your email address."
      );
    } catch (error: any) {
      let errorMessage = "An unknown error occurred. Please try again.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        default:
          errorMessage = error.message;
      }

      Toaster.error("Password Reset Error", errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        forgotPassword,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
