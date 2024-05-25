import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { signInWithEtherum } from "../siwe";
import { User } from "../types";
import { BACKEND_URL } from "../variables";

export interface IAuthContext {
  loggedInUser: User | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const res = await fetch(`${BACKEND_URL}/current-user`, {
      credentials: "include",
    });
    if (!res.ok) return;
    setLoggedInUser(await res.json());
  }

  async function login() {
    const res = await signInWithEtherum();
    if (!res || !res.ok) {
      console.log("Signin failed");
      return;
    }
    console.log("Getting user");
    getUser();
  }

  async function logout() {
    const res = await fetch(`${BACKEND_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) return;

    setLoggedInUser(null);
  }

  const value = {
    loggedInUser: loggedInUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("`useAuth` must be used within `<AuthProvider />`");
  }
  return context;
}
