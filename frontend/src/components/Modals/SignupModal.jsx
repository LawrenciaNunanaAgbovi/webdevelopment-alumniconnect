import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const SignupModal = ({ show, onClose, onSwitchToLogin, onSignup }) => {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    major: '',
    graduationYear: '',
    company: '',
    title: '',
    linkedin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitForm = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSignup(formData);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton><Modal.Title>Sign Up</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter full name" value={formData.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" type="text" placeholder="Choose a username" value={formData.username} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Major</Form.Label>
            <Form.Control name="major" type="text" placeholder="Your major" value={formData.major} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Graduation Year</Form.Label>
            <Form.Control name="graduationYear" type="number" placeholder="e.g. 2025" value={formData.graduationYear} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Company</Form.Label>
            <Form.Control name="company" type="text" placeholder="Current company" value={formData.company} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" placeholder="Job title" value={formData.title} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>LinkedIn</Form.Label>
            <Form.Control name="linkedin" type="text" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="link" onClick={onSwitchToLogin}>Already have an account? Log in</Button>
        <div>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={submitForm}>Sign Up</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupModal;
