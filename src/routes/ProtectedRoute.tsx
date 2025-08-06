import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: JSX.Element;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { auth } = useContext(AuthContext);

  if (!auth?.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
