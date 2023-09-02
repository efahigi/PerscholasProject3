const Book = require('../../models/book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  const newBook = new Book(req.body);
  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Book updated' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Book  deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


