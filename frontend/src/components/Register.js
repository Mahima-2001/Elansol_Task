import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, dob, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <Container className="register-container">
      <Form onSubmit={handleRegister} className="register-form">
        <h2 className="register-header">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formName" className="register-group">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formDob" className="register-group">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control 
            type="date" 
            placeholder="Enter date of birth" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="register-group">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="register-group">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="register-button">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;




