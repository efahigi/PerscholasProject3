// import axios from 'axios';

// const API_URL = 'http://localhost:3001/api/order';

// const getAuthorizationHeader = () => ({
//   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
// });


//   export const addOrder = async (orderData) => {
//     return await axios.post(API_URL, orderData, getAuthorizationHeader());
//   };
  
//   export const fetchAllOrders = async () => {
//     return await axios.get(API_URL, getAuthorizationHeader());
//   };
  
//   export const deleteOrder = async (id) => {
//     return await axios.delete(`${API_URL}/${id}`, getAuthorizationHeader());
//   };
  
//   export const updateOrder = async (id, book) => {
//     return await axios.put(`${API_URL}/${id}`, book, getAuthorizationHeader());
//   };
  

//   export const getOrderById = async (id) => {
//     return await axios.get(`${API_URL}/${id}`, getAuthorizationHeader());
//   };
  
  