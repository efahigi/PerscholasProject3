import React, { useState, useEffect } from 'react';
import * as OrderService from '../../utilities/OrderService';
import * as BookService from '../../utilities/BookService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

const NewOrderPage = () => {
  const [books, setBooks] = useState([]);
  const [newOrder, setNewOrder] = useState({ bookId: '', quantity: 1 });
  const [selectedBookTitle, setSelectedBookTitle] = useState("Choose a book"); 
  const [alert, setAlert] = useState({ type: '', message: '' });
  


  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await BookService.fetchBooks();
      setBooks(fetchedBooks.data);
    };
    fetchBooks();
  }, []);

  const addOrder = async () => {
    try {
      const response = await OrderService.addOrder(newOrder);
      console.log('Order placed:', response);
      setAlert({ type: 'success', message: 'Order placed successfully!' });
    } catch (error) {
      console.error('Failed to place order:', error);
      setAlert({ type: 'danger', message: error.message || 'Failed to place order' });
    }
  };

  const handleBookSelection = (selectedBookId) => {
    setNewOrder({...newOrder, bookId: selectedBookId});
    const book = books.find(book => book._id === selectedBookId);
    if (book) {
      setSelectedBookTitle(book.title);
    }
  };

  return (
    <div className="container gradientBg">
    <h3 className="title">Place your Order</h3>
    {alert.type && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
    <div className="row justify-content-center"> 
      <div className="col-md-6">
    <Form className='bordered-form'> 
      <Form.Group className="mb-3 form-label" controlId="bookId">
        <Form.Label>Book</Form.Label>
        <Dropdown onSelect={handleBookSelection}>
          <Dropdown.Toggle variant="default" id="dropdown-basic">
            {selectedBookTitle} {/* Display the selected book title */}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {books.map(book => (
              <Dropdown.Item key={book._id} eventKey={book._id}>
                {book.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      <Form.Group className="mb-3 form-label" controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control 
          type="number" 
          value={newOrder.quantity} 
          onChange={(e) => setNewOrder({...newOrder, quantity: e.target.value})}
        />
      </Form.Group>

      <Button variant="warning" type="button" onClick={addOrder}>
        Place Order
      </Button>
    </Form>
</div>
</div>
  </div>
  );
};

export default NewOrderPage;