import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, login, register } from "../api/api";
import { clearTokens, getTokens, saveTokens } from "../utils/tokenStorage";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextType = {
  user: User | null;
  authStatus: AuthStatus;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");

  const handleLogin = async (email: string, password: string) => {
    const data = await login(email, password);

    await saveTokens(data.accessToken, data.refreshToken);

    setUser(data.user);
    setAuthStatus("authenticated");
  };

  const handleLogout = async () => {
    await clearTokens();
    setUser(null);
    setAuthStatus("unauthenticated");
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const data = await register(name, email, password);

    await saveTokens(data.accessToken, data.refreshToken);

    setUser(data.user);
    setAuthStatus("authenticated");
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { accessToken, refreshToken } = await getTokens();

        if (!accessToken || !refreshToken) {
          setAuthStatus("unauthenticated");
          return;
        }

        const data = await getCurrentUser();

        setUser(data);
        setAuthStatus("authenticated");
      } catch (error) {
        console.log("SESSION RESTORE ERROR:", error);
        setAuthStatus("unauthenticated");
      }
    };
    /* const gettokensuser = async () => {
      const tokens = await getTokens();
      console.log(tokens);
    };
    gettokensuser();*/
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, authStatus, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be inside AuthProvider");
  }

  return context;
};
