const item = require('./item');

const Schema = require('mongoose').Schema;

const bookSchema= new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  // category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

module.exports = bookSchema;