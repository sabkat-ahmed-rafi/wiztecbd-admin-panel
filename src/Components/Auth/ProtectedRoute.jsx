import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userEmail = localStorage.getItem('userEmail');

  // Check if user is authenticated and has the correct email
  if (!isAuthenticated || userEmail !== 'abc@gmail.com') {
    return <Navigate to="/login" replace />;
  }

  return children;
}