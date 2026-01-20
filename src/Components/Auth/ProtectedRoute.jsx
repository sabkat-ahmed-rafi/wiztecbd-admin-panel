import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
  const token = Cookies.get("accessToken");

  const isAuthenticated = Boolean(token)

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}