import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as BookService from '../../utilities/BookService';

const BookList = () => {
    const [editedBookFields, setEditedBookFields] = useState({});
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
          const bookResponse = await BookService.fetchBooks();
          setBooks(bookResponse.data);
    
        };
    
        fetchBooks();
      }, []);
  
      const goToUpdatePage = (book) => {
        navigate(`/books/update/${book._id}`, { state: { book } });
      };
  
      const updateBook = async (id) => {
        if (!editedBookFields._id) {
          
          const bookToEdit = books.find(book => book._id === id);
          setEditedBookFields(bookToEdit);
          return;
        }
        const updatedBook = await BookService.updateBook(id, editedBookFields);
        setBooks(books.map(book => (book._id === id ? updatedBook : book)));
        setEditedBookFields({});
      };
    
      const deleteBook = async (id) => {
        await BookService.deleteBook(id);
        setBooks(books.filter(book => book._id !== id));
      };

  return (
    <div className="container gradientBg">
      <h3 className="title">View Books</h3>
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 bordered-form" key={book._id}>
            <div className="card mb-4">
              <img className="card-img-top card-image" src={`http://localhost:3001/${book.image.split('\\').join('/')}`} alt={book.title} />
              <div className="card-body">
                <h5 className="card-title">{book.title} </h5>
                <p className="card-text">By <strong>{book.author}</strong></p>
                <p className="card-text">${book.price}</p>
                <button className="btn btn-info mr-4" onClick={() => goToUpdatePage(book)}>Update</button>  &nbsp;&nbsp;
                <button className="btn btn-danger ml-2" onClick={() => deleteBook(book._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;