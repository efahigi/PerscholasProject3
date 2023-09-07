const path = require('path');
const multer = require('multer');
const Book = require('../../models/book');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    const sanitizedDate = new Date().toISOString().replace(/:/g, '-');
    const fileName = sanitizedDate + file.originalname;
    console.log("Attempting to save to:", path.join(__dirname, './uploads/', fileName));
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });
exports.upload = upload;

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
  const bookData = { 
    ...req.body,
    image: req.file ? req.file.path : null  
  };
  
  const newBook = new Book(bookData);

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
    const updatedData = {
      ...req.body,
      image: req.file ? req.file.path : req.body.image
    };

    await Book.findByIdAndUpdate(req.params.id, updatedData);
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

exports.fetchBookById = async (req, res) => {
  const id = req.params.id;
  console.log("fetchBookById is being called", req.params.id);
  try {
    const book = await Book.findById(id); 
  console.log("book", book);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message  });
  }
};
//ok

