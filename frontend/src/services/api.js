import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Fetch all schemes
export const getSchemes = async () => {
  const response = await api.get('/schemes');
  return response.data;
};

// Create a new citizen manually
export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Create a draft application
export const createApplication = async (applicationData) => {
  const response = await api.post('/applications', applicationData);
  return response.data;
};

// Start the Demo pipeline
export const runDemo = async () => {
  const response = await api.get('/demo-citizen');
  return response.data;
};

export default api;
