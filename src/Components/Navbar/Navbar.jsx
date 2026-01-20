import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Cookies from 'js-cookie';

export default function Navbar({ className }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate('/login');
  };

  return (
    <div className={`bg-white text-gray-800 p-4 shadow-lg ${className}`}>
      <div className="flex items-center justify-between">
        <a href='https://wiztecbd.com' target='_blank' className='w-40 ml-10 lg:ml-0'><img src="/logo.png" alt="" /></a>
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