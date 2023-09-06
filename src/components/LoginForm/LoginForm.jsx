import React, { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className="container gradientBg">
      <h3 className="title">Log In</h3>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row justify-content-center">
      <div className="col-md-6">
          <Form className="bordered-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 form-label" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="text" 
                name="email" 
                placeholder="Email" 
                value={credentials.email} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3 form-label" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={credentials.password} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Button variant="secondary" type="submit" >
             Log In
            </Button>
          </Form>
        </div>
        </div>
    </div>
  );
}
