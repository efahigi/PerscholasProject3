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
      <Row className="justify-content-center">
        <Col md={12}>
        <img src={logo} alt="logo" width="100%" height="10%" />
          <h3 className="title">Book Store</h3>
          <Button variant="warning" onClick={() => setShowSignUp(!showSignUp)}>
            {showSignUp ? 'Log In' : 'Sign Up'}
          </Button>
          <div className='bordered-form'>
            { showSignUp ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} /> }
          </div>
        </Col>
      </Row>
    </Container>
  );
}
