// import mongoose from "mongoose";
const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // img: {
  //   type: String,
  //   required: true
  // },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;