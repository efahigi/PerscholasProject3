const mongoose = require('mongoose');

const bookCategorySchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('BookCategory', bookCategorySchema);