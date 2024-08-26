import { useStorageState } from '@/hooks';
import { AuthApp } from '@/shared-libs/utilities/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, type PropsWithChildren } from 'react';

interface AuthContextProps {
  signIn: (email?: string, password?: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  signIn: (email?: string, password?: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = async (email?: string, password?: string) => {
    await signInWithEmailAndPassword(AuthApp, "" + email, "" + password)
    // setSession('xxx');
  }

  const signOut = () => {
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
