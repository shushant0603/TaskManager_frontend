import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { login } from './redux/authSlice';
import Login from './components/Login';
import TaskManager from './components/TaskManager';
import { getAuthToken } from './utils/tokenManager';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      // If we have a token, we can assume the user is authenticated
      // The actual user data will be fetched when needed
      dispatch(login({ token }));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <TaskManager /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 