import { useStorageState } from "@/hooks";
import { AuthApp } from "@/shared-libs/utilities/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut as signOutAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import {
  setDoc,
  collection,
  doc,
  getDoc,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { useRouter } from "expo-router";
import { User } from "@/types/User";
import { IUser } from "@/shared-libs/firestore/crowdy-chat/models/users";

interface AuthContextProps {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string) => void;
  forgotPassword: (email: string) => void;
  fetchUser: () => void;
  session?: string | null;
  isLoading: boolean;
  updateUser: (userId: string, user: Partial<User>) => Promise<void>;
  user?: User | null;
}

const AuthContext = createContext<AuthContextProps>({
  signIn: (email: string, password: string) => null,
  signOut: () => null,
  signUp: (email: string, password: string) => null,
  forgotPassword: (email: string) => null,
  fetchUser: () => null,
  session: null,
  isLoading: false,
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
            router.replace("/campaigns");
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

  const getUser = async () => {
    try {
      const user = AuthApp.currentUser;
      if (user) {
        const colRef = collection(FirestoreDB, "users");
        const query = where("email", "==", user.email);
        const userSnapshot = await getDoc(doc(colRef, user.uid));
        const userData = userSnapshot.data() as IUser;
        setUser({
          id: user.uid,
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
        signIn,
        signUp,
        signOut,
        forgotPassword,
        fetchUser,
        session,
        isLoading,
        updateUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
