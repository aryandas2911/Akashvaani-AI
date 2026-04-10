import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Generic error handler wrapper
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message || 'API Request failed');
  }
};

export const getSchemes = () => handleRequest(() => api.get('/schemes'));
export const createUser = (userData) => handleRequest(() => api.post('/users', userData));
export const createApplication = (applicationData) => handleRequest(() => api.post('/applications', applicationData));
export const runDemo = () => handleRequest(() => api.get('/demo-citizen'));
export const getReasoning = (userId) => handleRequest(() => api.get(`/agents/reasoning/${userId}`));
export const getUserByEmail = (email) => handleRequest(() => api.get(`/users/email/${email}`));

export default api;
