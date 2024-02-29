import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { User } from "../gql/graphql";

interface AuthContetxProps {
  isAuth: boolean;
  user: User | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  getToken: string | null;
}

export const authContext = createContext<AuthContetxProps>({
  isAuth: false,
  user: null,
  setUser: (_user: User | null) => {},
  setToken: (_token: string) => {},
  getToken: null,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

// const setToken = (token: string) => {
//   if (window === undefined) return;
//   localStorage.setItem("auth-token", token);
// };

// const getToken = (): string | null => {
//   return localStorage.getItem("auth-token");
// };

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [getToken, setToken] = useLocalStorage("auth-token", "");
  const [user, setUser] = useState<User | null>(null);
  return (
    <authContext.Provider
      value={{ isAuth: Boolean(getToken), setToken, getToken, user, setUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default AuthProvider;
