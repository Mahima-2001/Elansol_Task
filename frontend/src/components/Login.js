import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <Container className="login-container">
      <Form onSubmit={handleLogin} className="login-form">
        <h2 className="login-header">Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formUsername" className="login-group">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="login-group">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formRememberMe" className="login-group">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button variant="primary" type="submit" className="login-button">
          Login
        </Button>

        <div className="signup-link">
          <span>Don't have an account? </span>
          <Link to="/register">Sign Up</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
