import React, { useState } from 'react';
import * as BookService from '../../utilities/BookService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '' });
  const [newBookImage, setNewBookImage] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  

  const addBook = async () => {
    try {
    console.log('New book data:', newBook);
    console.log('New book image:', newBookImage);
    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('price', newBook.price);
    formData.append('image', newBookImage);

    const response = await BookService.addBook(formData);
    setBooks([...books, response.data]);
    setAlert({ type: 'success', message: 'Book added successfully!' });
  } catch (error) {
    setAlert({ type: 'danger', message: error.message || 'Failed to add book.' });
  }
  };

  return (
    <div className="container gradientBg">
      <h3 className="title">Add Book</h3>
      {alert.type && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
      <div className="row justify-content-center"> 
        <div className="col-md-6">
          <Form className='bordered-form'>
            <Form.Group className="mb-3 form-label" controlId="title">
              <Form.Label >Title</Form.Label>
              <Form.Control type="text" placeholder="Book Title" onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3 form-label " controlId="author">
              <Form.Label >Author</Form.Label>
              <Form.Control type="text" placeholder="Book Author" onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3 form-label " controlId="price">
              <Form.Label >Price</Form.Label>
              <Form.Control type="number" placeholder="Price" onChange={(e) => setNewBook({ ...newBook, price: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3 form-label " controlId="image">
              <Form.Label >Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setNewBookImage(e.target.files[0])} />
            </Form.Group>
            <Button variant="warning" type="button" onClick={addBook}>
              Add Book
            </Button>
          </Form>
        </div>
      </div>     
    </div>
  );
};
export default BookPage;
