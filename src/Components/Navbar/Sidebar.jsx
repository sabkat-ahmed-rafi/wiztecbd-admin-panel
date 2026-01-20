import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  FaChartBar,      // Dashboard icon
  FaBlog,          // Blogs icon
  FaEnvelope,      // Enquiries icon
  FaBars,          // Hamburger menu
  FaTimes          // Close menu
} from 'react-icons/fa';

export default function Sidebar({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname === path + '/';
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-3 z-20 shadow-lg text-black p-2 border border-slate-200 rounded-lg px-3"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      <div
        className={`p-4 pt-9 ${className} ${
          isOpen ? 'block' : 'hidden'
        } lg:block lg:w-64 border-r border-slate-300 text-stone-600 font-medium`}
      >
        <ul>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                isActive('/dashboard')
                  ? 'bg-[#ecfbda] text-[#6ab40a] border-l-4 border-[#8bc43f] font-medium'
                  : 'hover:bg-gray-200'
              } ${
                isActive('/')
                  ? 'bg-[#ecfbda] text-[#6ab40a] border-l-4 border-[#8bc43f] font-medium'
                  : 'hover:bg-gray-200'
              } `}
            >
              <FaChartBar className="mr-3" size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/blogs"
              className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                isActive('/blogs')
                  ? 'bg-[#ecfbda] text-[#8bc43f] border-l-4 border-[#8bc43f] font-medium'
                  : 'hover:bg-gray-200'
              }`}
            >
              <FaBlog className="mr-3" size={20} />
              <span>Blogs</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/enquiries"
              className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                isActive('/enquiries')
                  ? 'bg-[#ecfbda] text-[#8bc43f] border-l-4 border-[#8bc43f] font-medium'
                  : 'hover:bg-gray-200'
              }`}
            >
              <FaEnvelope className="mr-3" size={20} />
              <span>Enquiries</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}