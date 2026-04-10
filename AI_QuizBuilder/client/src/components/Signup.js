import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registration Successful! Now please login.');
      navigate('/login');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message || 'Registration failed'));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <select
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
          defaultValue="user"
        >
          <option value="user">Standard User</option>
          <option value="admin">Administrator</option>
        </select>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none' }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
