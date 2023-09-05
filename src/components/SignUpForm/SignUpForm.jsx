import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password } = this.state;
      const formData = { name, email, password };
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="container gradientBg">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Form className='bordered-form' autoComplete="off" onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3 form-label" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3 form-label" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3 form-label" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3 form-label" controlId="confirm">
                <Form.Label>Confirm</Form.Label>
                <Form.Control type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
              </Form.Group>

              <Button variant="warning" type="submit" disabled={disable}>
                Sign Up
              </Button>
            </Form>
            
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        </div>
      </div>
    );
  }
}
