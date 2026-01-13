import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-3 left-3 z-20 shadow-lg  text-black p-2 border rounded-lg px-3"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      <div
        className={`p-4 pt-9 ${className} ${
          isOpen ? 'block' : 'hidden'
        } lg:block lg:w-64 border-r border-slate-300`}
      >
        <ul>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <span className="mr-3">📊</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/blogs"
              className="flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <span className="mr-3">📝</span>
              <span>Blogs</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/enquiries"
              className="flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <span className="mr-3">📩</span>
              <span>Enquiries</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}