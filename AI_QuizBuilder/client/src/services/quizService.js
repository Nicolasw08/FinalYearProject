import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const submitQuizAttempt = async ({ shareToken, answers }) => {
  if (!shareToken) {
    throw new Error('Missing share token');
  }

  const response = await axios.post(`${API_BASE_URL}/share/${shareToken}/attempts`, {
    answers,
  });

  return response.data;
};

export default {
  submitQuizAttempt,
};
