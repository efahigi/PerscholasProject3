import React, { useState, useEffect } from 'react';
import * as BookService from '../../utilities/BookService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate  } from 'react-router-dom';

const UpdateBookPage = () => {
  const [updatedBookFields, setUpdatedBookFields] = useState({});
  const [newImage, setNewImage] = useState(null); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const fetchedBook = await BookService.fetchBookById(id);
      console.log('fetchedBook',fetchedBook);
      setUpdatedBookFields(fetchedBook.data);
    };
    fetchBook();
  }, [id]);

  
  const renderExistingImage = () => {
    if (updatedBookFields.image && !newImage)  {
      return (
        <div className="image-preview">
          <img 
            src={`http://localhost:3001/${updatedBookFields.image.split('\\').join('/')}`}
            alt="Existing book cover"
            width="100"
          />
          <p>Existing Image</p>
        </div>
      );
    }
  };
  
  const updateBook = async () => {

    const formData = new FormData();
    formData.append('title', updatedBookFields.title);
    formData.append('author', updatedBookFields.author);
    formData.append('price', updatedBookFields.price);
    formData.append('image', updatedBookFields.image);


    await BookService.updateBook(id, formData);
    navigate('/books');
  };

  if (!updatedBookFields) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container gradientBg">
      <h3 className="title">Update Book</h3>
      <div className="row justify-content-center"> 
      <div className="col-md-6">
      <Form className='bordered-form'>
        <Form.Group className="mb-3 form-label" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            value={updatedBookFields.title || ''} 
            onChange={(e) => setUpdatedBookFields({ ...updatedBookFields, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 form-label" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control 
            type="text" 
            value={updatedBookFields.author || ''} 
            onChange={(e) => setUpdatedBookFields({ ...updatedBookFields, author: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 form-label" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type="number" 
            value={updatedBookFields.price || ''} 
            onChange={(e) => setUpdatedBookFields({ ...updatedBookFields, price: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 form-label" controlId="image">
          <Form.Label>Image</Form.Label>
          
          {renderExistingImage()}
          <Form.Control 
            type="file" 
            onChange={(e) => {
                setNewImage(e.target.files[0]); 
                setUpdatedBookFields({...updatedBookFields, image: e.target.files[0]});
              }}   
            />
        </Form.Group>

        <Button variant="primary" type="button" onClick={updateBook}>
          Save
        </Button>
      </Form>
</div>
</div>
    </div>
  );
};

export default UpdateBookPage;