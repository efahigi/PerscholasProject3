import React, { useState, useEffect } from 'react';
import * as BookService from '../../utilities/BookService';
import * as BookCategoryService from '../../utilities/BookCategoryService';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', price: '', category: '' });
  const [editedBookId, setEditedBookId] = useState(null);
  const [editedBookFields, setEditedBookFields] = useState({});

  useEffect(() => {
    const fetchBooksAndCategories = async () => {
      const bookResponse = await BookService.fetchBooks();
      const categoryResponse = await BookCategoryService.fetchCategories();

      setBooks(bookResponse.data);
      setCategories(categoryResponse.data);
    };

    fetchBooksAndCategories();
  }, []);

  const addBook = async () => {
    const response = await BookService.addBook(newBook);
    setBooks([...books, response.data]);
  };

  const updateBook = async (id) => {
    if (editedBookId === id) {
      await BookService.updateBook(id, editedBookFields);
      setBooks(books.map(book => (book._id === id ? { ...book, ...editedBookFields } : book)));
      setEditedBookId(null);
      setEditedBookFields({});
    } else {
      setEditedBookId(id);
      const book = books.find(bk => bk._id === id);
      setEditedBookFields(book);
    }
  };

  const deleteBook = async (id) => {
    await BookService.deleteBook(id);
    setBooks(books.filter(book => book._id !== id));
  };

  return (
    <div>
      <h1>Books</h1>
      <div>
        <input type="text" placeholder="Book Title" onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
        <input type="number" placeholder="Price" onChange={e => setNewBook({ ...newBook, price: e.target.value })} />
        <select onChange={e => setNewBook({ ...newBook, category: e.target.value })}>
          <option value="" disabled selected>Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <button onClick={addBook}>Add Book</button>
      </div>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <input
              type="text"
              defaultValue={book.title}
              disabled={editedBookId !== book._id}
              onChange={e => setEditedBookFields({ ...editedBookFields, title: e.target.value })}
            />
            <input
              type="number"
              defaultValue={book.price}
              disabled={editedBookId !== book._id}
              onChange={e => setEditedBookFields({ ...editedBookFields, price: e.target.value })}
            />
            <select
              defaultValue={book.category}
              disabled={editedBookId !== book._id}
              onChange={e => setEditedBookFields({ ...editedBookFields, category: e.target.value })}
            >
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
            <button onClick={() => updateBook(book._id)}>
              {editedBookId === book._id ? 'Save' : 'Update'}
            </button>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookPage;
