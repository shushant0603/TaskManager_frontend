import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api'; // Import the API methods
import {useDispatch} from 'react-redux';
import {login} from '../redux/authSlice'; // Import the login action

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch=useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Call the signup API
      const data = await authAPI.signup(email, password);
      console.log('Signup successful:', data);
      setSuccess('Signup successful! Redirecting to login...');

        
      // Dispatch login action to update Redux state
      dispatch(login({ email }));
      
      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate('/home');
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error('Error:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>Signup</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Signup
        </button>
        <button
          type="button"
          onClick={handleNavigateToLogin}
          style={{ width: '100%', padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
        >
          Go to Login
        </button>
      </form>
    </div>
  );
};

export default Signup;