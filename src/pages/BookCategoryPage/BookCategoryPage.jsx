import React, { useState, useEffect } from 'react';
import * as BookCategoryService from '../../utilities/BookCategoryService';

const BookCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await BookCategoryService.fetchCategories();
      setCategories(response.data);
    };
    fetchData();
  }, []);

  const addCategory = async () => {
    const response = await BookCategoryService.addCategory(newCategory);
    setCategories([...categories, response.data]);
  };

  const updateCategory = async (id) => {
    if (editedCategoryId === id) {
      const updatedCategory = { _id: id, name: editedCategoryName };
      await BookCategoryService.updateCategory(id, updatedCategory);
      setCategories(categories.map(category => (category._id === id ? updatedCategory : category)));
      setEditedCategoryId(null);
      setEditedCategoryName('');
    } else {
      setEditedCategoryId(id);
      const category = categories.find(cat => cat._id === id);
      setEditedCategoryName(category ? category.name : '');
    }
  };
  

  const deleteCategory = async (id) => {
    await BookCategoryService.deleteCategory(id);
    setCategories(categories.filter(category => category._id !== id));
  };

  return (
    <div>
      <h1>Book Categories</h1>
      <div>
        <input type="text" placeholder="Category Name" onChange={e => setNewCategory({ name: e.target.value })} />
        <button onClick={addCategory}>Add Category</button>
      </div>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            <input
              type="text"
              defaultValue={category.name}
              disabled={editedCategoryId !== category._id}
              onChange={e => setEditedCategoryName(e.target.value)}
            />
            <button onClick={() => updateCategory(category._id)}>
              {editedCategoryId === category._id ? 'Save' : 'Update'}
            </button>
            <button onClick={() => deleteCategory(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookCategoryPage;
