import { PropsWithChildren } from "react";
import { useAuth } from "../hooks/auth.context";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: PropsWithChildren) {
  const { isAuth } = useAuth();
  return isAuth ? <>{children}</> : <Navigate to={"/auth/signin"} />;
}
