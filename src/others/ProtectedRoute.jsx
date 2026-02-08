import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("token"); 
  // OR use context if you have one

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
