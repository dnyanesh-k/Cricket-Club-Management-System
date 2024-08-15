import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {registerUser} from '../services/user'; // Import the axios instance
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
    confirmPassword: '',
    role: 'MEMBER', // Default role
    playerPosition: '',
    playerTeam: '',
    playerBattingStyle: '',
    playerBowlingStyle: '',
    coachSpecialization: '',
    coachExperienceYears: '',
    coachTeam: '',
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side form validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Send the form data to the backend
      const response = await registerUser(formData);
      if(response==="User registered Successfully"){
        navigate("/login")
      }
      
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle registration errors
    }
  };

  const renderAdditionalFields = () => {
    if (formData.role === 'PLAYER') {
      return (
        <>
          <Form.Group controlId="formPlayerPosition" className="mb-3">
            <Form.Label>Player Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your position"
              name="playerPosition"
              value={formData.playerPosition}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPlayerBattingStyle" className="mb-3">
            <Form.Label>Batting Style</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your batting style"
              name="playerBattingStyle"
              value={formData.playerBattingStyle}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPlayerBowlingStyle" className="mb-3">
            <Form.Label>Bowling Style</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your bowling style"
              name="playerBowlingStyle"
              value={formData.playerBowlingStyle}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </>
      );
    } else if (formData.role === 'COACH') {
      return (
        <>
          <Form.Group controlId="formCoachSpecialization" className="mb-3">
            <Form.Label>Specialization</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your specialization"
              name="coachSpecialization"
              value={formData.coachSpecialization}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCoachExperienceYears" className="mb-3">
            <Form.Label>Experience Years</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter years of experience"
              name="coachExperienceYears"
              value={formData.coachExperienceYears}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </>
      );
    }
    return null;
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="PLAYER">Player</option>
                <option value="COACH">Coach</option>
                <option value="MEMBER">Member</option>
              </Form.Select>
            </Form.Group>

            {renderAdditionalFields()}

            <Button variant="primary" type="submit" className="w-50 mb-5">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
