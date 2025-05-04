import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // store
import {login} from '../redux/authSlice'; // store
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); //store

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = await authAPI.login(email, password);
      console.log('Login successful:', data);
      setSuccess('Login successful!');
      
      // The token is now stored in sessionStorage by the authAPI.login function
      dispatch(login({ 
        email: data.user.email,
        id: data.user.id 
      }));     //store
      navigate('/home');
    } catch (err) {
      console.error('Error:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleNavigateToSignup = () => {
    navigate('/signup'); // Navigate to signup page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
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
          Login
        </button>
        <button
          type="button"
          onClick={handleNavigateToSignup}
          style={{ width: '100%', padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
        >
          Go to Signup
        </button>
      </form>
    </div>
  );
};

export default Login;