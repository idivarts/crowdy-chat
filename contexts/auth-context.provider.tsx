import { useStorageState } from '@/hooks';
import { useContext, createContext, type PropsWithChildren } from 'react';

interface AuthContextProps {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = () => {
    setSession('xxx');
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
