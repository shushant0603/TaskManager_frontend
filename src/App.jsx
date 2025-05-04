import React,{useEffect, useState} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import About from './pages/About'
import { authAPI } from './services/api'; 
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/authSlice';


import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LandingPage from './pages/LandingPage'
import Homepage from './pages/Home/Homepage'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const validateAuth = async () => {
      try {
        // Check if we have a token key in sessionStorage
        const tokenKey = sessionStorage.getItem('auth_token_key');
        if (tokenKey) {
          const token = sessionStorage.getItem(tokenKey);
          if (token) {
            const user = await authAPI.validateToken();
            dispatch(login({ 
              email: user.email,
              id: user._id 
            }));
          } else {
            // Token key exists but no token found, clear the key
            sessionStorage.removeItem('auth_token_key');
            dispatch(logout());
          }
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Invalid token:', error);
        dispatch(logout());
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  // const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/home" element={
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      } />
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/land" element={<LandingPage />} /> */}
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
      <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/home" />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
