const Category = require('../../models/bookCategory');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Book Category updated' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Book Category deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
