const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
 /* userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },*/
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  
  datePlaced: {
    type: Date
  }

});

module.exports = mongoose.model('Order', OrderSchema);