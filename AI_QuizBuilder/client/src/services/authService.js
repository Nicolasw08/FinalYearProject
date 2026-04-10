import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const loginUser = async ({ username, password }) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
  return response.data;
};

export const registerUser = async ({ username, password, role = 'user' }) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    username,
    password,
    role,
  });
  return response.data;
};

export default {
  loginUser,
  registerUser,
};
