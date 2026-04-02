import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      // Save the token so the user stays logged in
      localStorage.setItem('token', response.data.token);
      alert("Login Successful!");
      navigate('/dashboard'); 
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required style={{display:'block', width:'100%', marginBottom:'10px'}} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={{display:'block', width:'100%', marginBottom:'10px'}} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;