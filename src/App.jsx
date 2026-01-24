import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Navbar/Sidebar';
import Dashboard from './Components/Dashboard/Dashboard';
import Blogs from './Components/Blogs/Blogs';
import Contacts from './Components/Contacts/Contacts';
import Login from './Components/Auth/Login';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import Signup from './Components/Auth/Signup';
import SmoothFollower from './Components/animation/SmoothFollower';
import { Toaster } from 'react-hot-toast';
import Career from './Components/Career/Career';

function App() {
  return (
    <Router>
      <Toaster />
      <SmoothFollower />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="*" element={
          <ProtectedRoute>
            <div className="app flex flex-col h-screen">
              <Navbar className="fixed top-0 w-full z-10" />
              <div className="main-content flex flex-1 mt-16">
                <Sidebar className="sticky top-16 h-[calc(100vh-4rem)]" />
                <div className="content flex-1 p-4 overflow-auto">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="" element={<Dashboard />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/Contacts" element={<Contacts />} />
                    <Route path="/career" element={<Career />} />
                  </Routes>
                </div>
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
