import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, login } from "../api/api";
import { getTokens, saveTokens } from "../utils/tokenStorage";
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
};
export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("AUTH PROVIDER RENDERED");

  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const handleLogin = async (email: string, password: string) => {
    const data = await login(email, password);
    console.log("LOGIN DATA:", data);
    await saveTokens(data.accessToken, data.refreshToken);
    setAuthStatus("authenticated");
    setUser(data.user);
  };

  useEffect(() => {
    console.log("AUTH EFFECT STARTED");
    const testTokens = async () => {
      console.log("ABOUT TO GET TOKENS");
      const tokens = await getTokens();
      console.log("TOKENS:", tokens);
    };

    const Userdata = async () => {
      const data = await getCurrentUser();
      console.log("User", data);
    };
    testTokens();
    Userdata();
  }, []);
  return (
    <AuthContext.Provider value={{ user, authStatus, handleLogin }}>
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
