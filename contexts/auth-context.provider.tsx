import { resetAndNavigate } from "@/helpers/router";
import { useStorageState } from "@/hooks";
import { IUser } from "@/shared-libs/firestore/crowdy-chat/models/users";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { User } from "@/types/User";
import { AuthApp } from "@/utils/auth";
import { FirestoreDB } from "@/utils/firestore";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as signOutAuth,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

interface AuthContextProps {
  fetchUser: () => void;
  forgotPassword: (email: string) => void;
  getUser: (id: string) => void;
  isLoading: boolean;
  session?: string | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string) => void;
  updateUser: (userId: string, user: Partial<User>) => Promise<void>;
  user?: User | null;
}

const AuthContext = createContext<AuthContextProps>({
  fetchUser: () => null,
  forgotPassword: (email: string) => null,
  getUser: (id: string) => null,
  isLoading: false,
  session: null,
  signIn: (email: string, password: string) => null,
  signOut: () => null,
  signUp: (email: string, password: string) => null,
  updateUser: (userId: string, user: Partial<User>) => Promise.resolve(),
  user: null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [[isLoading, session], setSession] = useStorageState("session-id");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    if (session) {
      const userDocRef = doc(FirestoreDB, "users", session);

      const unsubscribe = onSnapshot(userDocRef, (userSnap) => {
        if (userSnap.exists()) {
          const userData = {
            ...(userSnap.data() as User),
            id: userSnap.id as string,
          };
          setUser(userData);
        } else {
          console.error("User not found");
        }
      });

      return unsubscribe;
    }
  };

  useEffect(() => {
    fetchUser();
  }, [session]);

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
      router.replace("/campaigns");
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
    await createUserWithEmailAndPassword(AuthApp, email, password)
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
            resetAndNavigate("/create-new-organization");
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

  const getUser = async (
    id: string,
  ) => {
    try {
      if (user) {
        const colRef = collection(FirestoreDB, "users");
        const userSnapshot = await getDoc(doc(colRef, id));
        const userData = userSnapshot.data() as IUser;
        setUser({
          id: id,
          ...userData,
        });
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
      Toaster.error("Failed to fetch user");
    }
  };

  const updateUser = async (
    userId: string,
    user: Partial<User>
  ): Promise<void> => {
    const userRef = doc(FirestoreDB, "users", userId);

    await updateDoc(userRef, {
      ...user,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        fetchUser,
        forgotPassword,
        getUser,
        isLoading,
        session,
        signIn,
        signOut,
        signUp,
        updateUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
