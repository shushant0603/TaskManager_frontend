import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authAPI } from '../../services/api';// Adjust the import path as necessary

import {logout} from '../../redux/authSlice'

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    
    await authAPI.logout(); // Call the logout API
    dispatch(logout());
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <nav className=" bg-[#FFEFE0] text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-2">
    {/* Add the logo image */}
    <img
      src="Logo(Nav).png" // Replace with the actual path to your logo
      alt="TaskMaster AI Logo"
      className="h-9 w-9" // Adjust height and width as needed
    />
    <Link to="/" className="text-2xl font-bold text-black hover:text-gray-200">
      TaskMaster AI
    </Link>
  </div>
      <div className="space-x-4">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-800"
            >
              Sign Up
            </Link>
          </>
        ) : (
            <>
            <Link
              to="/home"
              className="bg-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
            >
              Logout
            </button>
          </>
          
        )}
      </div>
    </nav>
  );
};

export default Navbar;