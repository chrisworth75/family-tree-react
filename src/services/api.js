import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllTrees = async () => {
  const response = await api.get('/api/trees');
  return response.data;
};

export const getTreeWithMembers = async (treeId) => {
  const response = await api.get(`/api/trees/${treeId}/full`);
  return response.data;
};

export default api;
