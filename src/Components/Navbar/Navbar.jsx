import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ className }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className={`bg-white text-gray-800 p-4 shadow-lg ${className}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking ml-12 lg:ml-0 text-slate-800">WiztecBD</h1>
        <div>
        <button
          onClick={handleLogout}
          className="btn"
        >
           
          <i class="animation"></i>Log Out<i class="animation"></i>
        </button>
        </div>
      </div>
    </div>
  );
}