import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../config/config';
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${config.backend}/api/admin/login`, {
        email,
        password
      }, {
        headers: {
          "x-api-key": config.apiKey,
        },
      });

      if (response.data.status === 200) {
        const token = response.data.token;
        Cookies.set("accessToken", token, {
          expires: 30,          
          secure: true,
          sameSite: "strict",
        });
        navigate('/');
      }
    } catch (error) {
      console.log(error)
      setError('Invalid email or password. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #010133 100%)",
      }}
      className="min-h-screen flex items-center justify-center p-4">
      <div
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
      }}
      className=" rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md transform hover:scale-105 transition-transform duration-300 border border-white bg-transparent ">
        <h2 className="text-3xl font-bold text-center text-white mb-8">WiztecBD <br /> Admin Panel Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form 
       onSubmit={handleSubmit} 
       className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-200 text-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-200 text-white"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-black font-medium text-lg transition duration-200 hover:scale-95 active:scale-105 ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-white hover:bg-slate-200 cursor-pointer'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-white hover:text-gray-300 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} WizTecBD Admin Panel</p>
        </div>
      </div>
    </div>
  );
}