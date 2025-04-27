import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskManager from './Taskmanager';

const Homepage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get authentication state from Redux
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    // Show a loading spinner or placeholder while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Navbar/>
  <TaskManager/>
    </div>
  );
};

export default Homepage;