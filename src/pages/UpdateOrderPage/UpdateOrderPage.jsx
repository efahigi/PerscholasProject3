import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as OrderService from '../../utilities/OrderService';
import * as BookService from '../../utilities/BookService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

const UpdateOrderPage = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [order, setOrder] = useState(null);
  const [selectedBookTitle, setSelectedBookTitle] = useState("Choose a book");
  const statuses = ['Pending','Completed'];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedBooks, fetchedOrder] = await Promise.all([
        BookService.fetchBooks(),
        OrderService.getOrderById(id)
      ]);
  
      setBooks(fetchedBooks.data);
      setOrder(fetchedOrder.data);
  
      const matchingBook = fetchedBooks.data.find(book => book._id === fetchedOrder.data.bookId);
      
      if (matchingBook) {
        setSelectedBookTitle(matchingBook.title);
      }
    };
    
    fetchData();
  }, [id]);
  

  const updateOrder = async () => {
    try {
      const response = await OrderService.updateOrder(order._id, order);
      console.log('Order updated:', response);
      navigate('/orders');
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const handleBookSelection = (selectedBookId) => {
    setOrder({ ...order, bookId: selectedBookId });
    const book = books.find(book => book._id === selectedBookId);
    if (book) {
      setSelectedBookTitle(book.title);
    }
  };

  const handleStatusSelection = (status) => {
    setOrder({ ...order, status });
  };

  return (
    <div className="container gradientBg">
      <h3 className="title">Update Order</h3>
      {order && (
 <div className="row justify-content-center"> 
 <div className="col-md-6">
<Form className='bordered-form'> 
          <Form.Group className="mb-3 form-label" controlId="bookId">
            <Form.Label>Select Book</Form.Label>
            <Dropdown onSelect={handleBookSelection}>
              <Dropdown.Toggle variant="default" id="dropdown-basic">
                {selectedBookTitle}
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
              value={order.quantity} 
              onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3 form-label" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" value={order.status} onChange={(e) => handleStatusSelection(e.target.value)}>
              {statuses.map(status => (
                <option key={status}>{status}</option>
              ))}
            </Form.Control>
          </Form.Group>
{/* Update Order button */}
          <Button variant="warning" type="button" onClick={updateOrder}>
            Update Order
          </Button>
        </Form>
        </div>
        </div>
      )}
    </div>
  );
};

export default UpdateOrderPage;