const express = require('express');
const router = express.Router();
const isLoggedIn = require('../../config/ensureLoggedIn');
const bookController = require('../../controllers/api/books');

router.get('/', isLoggedIn, bookController.getAllBooks);
router.post('/', isLoggedIn, bookController.createBook);
router.put('/:id', isLoggedIn, bookController.updateBook);
router.delete('/:id', isLoggedIn, bookController.deleteBook);

module.exports = router;