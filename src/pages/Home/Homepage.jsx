import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import TaskMannager from './Taskmanager'; // Adjust the import path as necessary
import MyWork from './MyWork';



const Homepage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get authentication state from Redux
  const navigate = useNavigate();
  const [showTaskManager, setShowTaskManager] = useState(false);

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
const toggleTaskManager = () => {
    setShowTaskManager((prev) => !prev);
  }


  return (
    <div>
        <Navbar/>
        <div className="flex flex-col items-center mt-8">
        {/* Toggle Button */}
        <button
          onClick={toggleTaskManager}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {showTaskManager ? 'Close Task Manager' : 'Open Task Manager'}
        </button>

        {/* Conditionally Render TaskManager */}
        {showTaskManager && (
          <div className="mt-6 w-full max-w-4xl">
            <TaskMannager />
          </div>
        )}

        <MyWork/>
      </div>
    </div>
  );
};

export default Homepage;