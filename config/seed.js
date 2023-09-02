require('dotenv').config();
require('./database');

const Category = require('../models/category');
const Item = require('../models/item');

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Fiction', sortOrder: 10},
    {name: 'None Fiction', sortOrder: 20},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {title: 'Hamburger',  category: categories[0], price: 5.95},
    { title: 'Turkey Sandwich', category: categories[0], price: 6.95},
    { title: 'Hot Dog',  category: categories[0], price: 3.95},
    { title: 'Crab Plate',  category: categories[1], price: 14.95},
    { title: 'Fried Shrimp',  category: categories[1], price: 13.95},
    { title: 'Whole Lobster',  category: categories[1], price: 25.95},
    { title: 'Taco',   category: categories[0], price: 1.95},
    { title: 'Burrito',  category: categories[0], price: 4.95},
    { title: 'Pizza Slice',  category: categories[0], price: 3.95},
    { title: 'Spaghetti',  category: categories[0], price: 7.95},
    { title: 'Garlic Bread',  category: categories[0], price: 1.95},
    { title: 'French Fries',  category: categories[0], price: 2.95},
    { title: 'Green Salad',  category: categories[0], price: 3.95},
    { title: 'Ice Cream',  category: categories[1], price: 1.95},
    { title: 'Cup Cake',  category: categories[1], price: 0.95},
    { title: 'Custard', category: categories[1], price: 2.95},
    { title: 'Strawberry Shortcake',  category: categories[5], price: 3.95},
    { title: 'Milk',category: categories[1], price: 0.95},
    { title: 'Coffee',  category: categories[1], price: 0.95},
    { title: 'Mai Tai', category: categories[1], price: 8.95},
    { title: 'Beer',  category: categories[1], price: 3.95},
    { title: 'Wine',  category: categories[1], price: 7.95},
  ]);

  console.log(items)

  process.exit();

})();