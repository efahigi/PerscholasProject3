import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import * as OrderService from '../../utilities/OrderService';
import * as BookService from '../../utilities/BookService';


const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await BookService.fetchBooks();
      setBooks(fetchedBooks.data);
    };

    const fetchOrders = async () => {
      const fetchedOrders = await OrderService.fetchAllOrders();
      setOrders(fetchedOrders.data);
    };

    fetchBooks();
    fetchOrders();
  }, []);


  const enrichOrdersWithBookTitles = () => {
    return orders.map(order => {
      const book = books.find(book => book._id === order.bookId);
      return {
        ...order,
        bookTitle: book ? book.title : "Unknown"
      };
    });
  };

  const enrichedOrders = enrichOrdersWithBookTitles();

  const goToUpdatePage = (orderId) => {
    console.log('orderId',orderId);
    navigate(`/order/update/${orderId}`);
  };

  const handleDelete = async (orderId) => {

    const result = await OrderService.deleteOrder(orderId);
    setOrders(orders.filter(o => o._id !== orderId));
  };

  return (
    <div className="container gradientBg">
      <h3 className="title">All Orders</h3>
      <div className="row justify-content-center"> 
      <div className="col-md-12">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Book Title</th>
            <th>Quantity</th>
            <th>Date Placed</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrichedOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.bookTitle}</td>
              <td>{order.quantity}</td>
              <td>{new Date(order.datePlaced).toLocaleString()}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="warning" onClick={() => goToUpdatePage(order._id)}>
                  Update
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(order._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;