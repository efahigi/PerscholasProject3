import axios from 'axios';
//book api
const API_URL = 'http://localhost:3001/api/book';

const getAuthorizationHeader = () => ({
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});

export const fetchBooks = async () => {
  return await axios.get(API_URL, getAuthorizationHeader());
};

export const addBook = async (book) => {
  return await axios.post(API_URL, book, getAuthorizationHeader());
};

export const updateBook = async (id, book) => {
  return await axios.put(`${API_URL}/${id}`, book, getAuthorizationHeader());
};

export const deleteBook = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthorizationHeader());
};

export const fetchBookById = async (id) => {
  return await axios.get(`${API_URL}/${id}`, getAuthorizationHeader());
};
