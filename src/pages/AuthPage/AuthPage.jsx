import React, { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../assets/logo.png';
export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (

    <Container className="gradientBg">
    <img src={logo} alt="logo" width="100px" height="100px"  />
      <Row className="justify-content-center">
        <Col md={10}>
          <h3 className="title">Book Store</h3>
          <div className='bordered-form'>
            { showSignUp ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} /> }
            <Button variant="warning" onClick={() => setShowSignUp(!showSignUp)}>
            {showSignUp ? 'Log In' : 'Sign Up'}
          </Button>
          </div>
        </Col>
      </Row>
    </Container> 
  );
}
