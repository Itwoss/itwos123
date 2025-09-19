// client/src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Freelance Portfolio</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/projects" className="text-white hover:text-gray-300">Projects</Link>
          <Link to="/booking" className="text-white hover:text-gray-300">Book a Service</Link>
          
          {currentUser ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
              {currentUser.isAdmin && (
                <Link to="/admin" className="text-white hover:text-gray-300">Admin</Link>
              )}
              <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2 py-2 bg-gray-700 rounded">
          <Link to="/" className="block px-4 py-2 text-white hover:bg-gray-600">Home</Link>
          <Link to="/projects" className="block px-4 py-2 text-white hover:bg-gray-600">Projects</Link>
          <Link to="/booking" className="block px-4 py-2 text-white hover:bg-gray-600">Book a Service</Link>
          
          {currentUser ? (
            <>
              <Link to="/dashboard" className="block px-4 py-2 text-white hover:bg-gray-600">Dashboard</Link>
              {currentUser.isAdmin && (
                <Link to="/admin" className="block px-4 py-2 text-white hover:bg-gray-600">Admin</Link>
              )}
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 text-white hover:bg-gray-600">Login</Link>
              <Link to="/signup" className="block px-4 py-2 text-white hover:bg-gray-600">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
