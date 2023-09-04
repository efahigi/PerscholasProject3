const express = require('express');
const router = express.Router();
const isLoggedIn = require('../../config/ensureLoggedIn');
const bookCategoryController = require('../../controllers/api/bookCategories');

router.get('/', isLoggedIn, bookCategoryController.getAllCategories);
router.post('/', isLoggedIn, bookCategoryController.createCategory);
router.put('/:id', isLoggedIn, bookCategoryController.updateCategory);
router.delete('/:id', isLoggedIn, bookCategoryController.deleteCategory);

module.exports = router;