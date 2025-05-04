import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTasks, FaUser, FaHome, FaSignOutAlt } from 'react-icons/fa';

import Navbar from '../components/Navbar';
import TaskMannager from './Taskmanager';
import MyWork from './MyWork';

const Homepage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mywork');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-16">
          <div className="p-4">
            {/* User Profile Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-4xl text-gray-400" />
                )}
              </div>
              <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('mywork')}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg ${
                  activeTab === 'mywork'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaTasks />
                <span>My Work</span>
              </button>
              <button
                onClick={() => setActiveTab('taskmanager')}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg ${
                  activeTab === 'taskmanager'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaHome />
                <span>Task Manager</span>
              </button>
            
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 p-8 flex-1">
          {activeTab === 'mywork' && <MyWork />}
          {activeTab === 'taskmanager' && <TaskMannager />}
        </div>
      </div>
    </div>
  );
};

export default Homepage;