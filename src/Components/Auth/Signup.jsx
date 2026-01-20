import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../config/config';


export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      setProfilePicture(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

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

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Create form data object
    const formData = {
      name,
      email,
      password,
      profilePicture
    };

    try {
      const response = await axios.post(`${config.backend}/api/admin/register`, formData, {
         headers: {
          "x-api-key": config.apiKey,
         },
        })
      if(response.data.status == 201) {
        navigate('/');
      }
    } catch (error) {
      setError('An error occurred during signup. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #010133 100%)",
      }}
      className="min-h-screen flex items-center justify-center p-3 sm:p-4">
      <div
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
      }}
      className="rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-lg sm:max-w-xl md:max-w-2xl transform hover:scale-105 transition-transform duration-300 border border-white bg-transparent mx-2 sm:mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-8">WiztecBD <br /> Admin Panel Signup</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 sm:mb-6 text-sm sm:text-base" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-200 text-white text-sm sm:text-base placeholder:text-gray-400"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-200 text-white text-sm sm:text-base placeholder:text-gray-400"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password and Profile Picture Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-200 text-white text-sm sm:text-base placeholder:text-gray-400"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label htmlFor="profilePicture" className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                Profile Picture
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start">
                <div className="flex-1 min-w-0">
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-white focus:ring-2 focus:ring-white focus:border-transparent transition duration-200 text-white text-xs sm:text-sm file:mr-2 sm:file:mr-4 file:py-0.5 file:px-2 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-white file:text-black hover:file:bg-gray-100 file:truncate cursor-pointer file:cursor-pointer"
                  />
                </div>
                {imagePreview && (
                  <div className="shrink-0 mt-0 sm:mt-0 w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-12">
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-full h-full rounded-lg object-fill border border-white"
                    />
                  </div>
                )}
              </div>
              {profilePicture && (
                <div className="text-xs sm:text-sm text-gray-300 truncate">
                  Selected: {profilePicture.name}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 sm:py-3 px-4 rounded-lg text-black font-medium text-base sm:text-lg duration-200 mt-4 sm:mt-6 hover:scale-105 active:scale-95 transition-transform ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-white hover:bg-slate-200 cursor-pointer'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center text-sm sm:text-base">
                <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:text-gray-300 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
          <p>© {new Date().getFullYear()} WizTecBD Admin Panel</p>
        </div>
      </div>
    </div>
  );
}