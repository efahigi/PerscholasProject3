const express = require('express');
const router = express.Router();
const isLoggedIn = require('../../config/ensureLoggedIn');
const bookController = require('../../controllers/api/books');


router.get('/', isLoggedIn, bookController.getAllBooks);
router.get('/:id',isLoggedIn, bookController.fetchBookById);
router.post('/', isLoggedIn, bookController.upload.single('image'), bookController.createBook);
//router.post('/', isLoggedIn, bookController.createBook);
router.put('/:id', isLoggedIn, bookController.upload.single('image'),bookController.updateBook);
router.delete('/:id', isLoggedIn, bookController.deleteBook);
//best
module.exports = router;