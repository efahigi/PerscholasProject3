import axios from 'axios';

const API_URL = '/api/bookcategory';

const getAuthorizationHeader = () => ({
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});

export const fetchCategories = async () => {
  return await axios.get(API_URL, getAuthorizationHeader());
};

export const addCategory = async (category) => {
  return await axios.post(API_URL, category, getAuthorizationHeader());
};

export const updateCategory = async (id, category) => {
  return await axios.put(`${API_URL}/${id}`, category, getAuthorizationHeader());
};

export const deleteCategory = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthorizationHeader());
};
