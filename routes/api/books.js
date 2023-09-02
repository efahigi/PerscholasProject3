//---Load express into my  application
const express = require('express');
const router = express.Router();
// const Books = require('../../controllers/api/books');
// Load Book model
const Book = require('../../models/book');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  
   Book.find()
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Book.create(req.body)
    .then(book => res.json({ msg: 'Book added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a book' }));
});

module.exports = router;



// // import {Router} from 'express'
// // import userAuth from '../../middleware/auth.js';
// // import { calcLateAndFine } from '../../middleware/calcLateAndFine.js';
// // import validation from '../../middleware/validation.js';
// // import { fileUpload } from '../../utils/fileUpload.js';
// // import * as bookController from './book.controller.js';
// // import * as bookValidation from './book.validation.js';

// const express = require('express');
// const router = express.Router();
// const bookController = require('../../controllers/api/books');
// import * as bookValidation from './book.validation.js';


// router.post('/',userAuth,fileUpload('path'),validation(bookValidation.bookSchema),bookController.addBook)
// router.get('/',userAuth,bookController.getAllBooks)
// router.get('/books/:id',userAuth,bookController.getBookById)
// router.post('/issue',userAuth,validation(bookValidation.issueBookSchema),bookController.issueBook)
// router.post('/return',userAuth,validation(bookValidation.returnBookSchema),bookController.returnBook)
// router.get('/issue',userAuth,bookController.getIssuedBooks)
// router.get('/searchBooks/:letters',userAuth,bookController.getAllBooksByName)

// router.get('/search/:bookName',userAuth,validation(bookValidation.searchBookSchema),bookController.searchIssuedBooks)
// router.get('/nonreturn',userAuth,calcLateAndFine,bookController.getNonReturnedBooks)



// export default router;