// import mongoose from "mongoose";
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookCategory',
    required: true,
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;