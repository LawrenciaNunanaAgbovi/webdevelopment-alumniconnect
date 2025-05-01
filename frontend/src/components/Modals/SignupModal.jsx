import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const SignupModal = ({ show, onClose, setAuth, setUser, navigate, setShowLogin }) => {
  const [formData, setFormData] = useState({
    name: '', username: '', email: '', password: '', confirmPassword: '', role: 'user',
    major: '', graduationYear: '', company: '', title: '', linkedin: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const res = await fetch('http://138.197.93.75:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');

      setAuth(formData.role);
      setUser(data);
      onClose();
      alert('Account created successfully!');
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton><Modal.Title>Sign Up</Modal.Title></Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-2"><Form.Label>Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} /></Form.Group>

          <Form.Group className="mb-2"><Form.Label>Username</Form.Label>
            <Form.Control name="username" value={formData.username} onChange={handleChange} /></Form.Group>

          <Form.Group className="mb-2"><Form.Label>Email</Form.Label>
            <Form.Control name="email" value={formData.email} onChange={handleChange} /></Form.Group>

          <Form.Group className="mb-2"><Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" value={formData.password} onChange={handleChange} /></Form.Group>

          <Form.Group className="mb-2"><Form.Label>Confirm Password</Form.Label>
            <Form.Control name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} /></Form.Group>

          <Form.Group className="mb-2"><Form.Label>Role</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select></Form.Group>

          <Form.Group className="mb-2"><Form.Label>Major</Form.Label>
            <Form.Control name="major" value={formData.major} onChange={handleChange} /></Form.Group>

          <Form.Group className="mb-2"><Form.Label>Graduation Year</Form.Label>
            <Form.Control name="graduationYear" value={formData.graduationYear} onChange={handleChange} /></Form.Group>

          <Form.Group className="mb-2"><Form.Label>Company</Form.Label>
            <Form.Control name="company" value={formData.company} onChange={handleChange} /></Form.Group>

          <Form.Group className="mb-2"><Form.Label>Title</Form.Label>
            <Form.Control name="title" value={formData.title} onChange={handleChange} /></Form.Group>

          <Form.Group className="mb-2"><Form.Label>LinkedIn</Form.Label>
            <Form.Control name="linkedin" value={formData.linkedin} onChange={handleChange} /></Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="link" onClick={() => { onClose(); setShowLogin(true); }}>
          Already have an account? Log in
        </Button>
        <div>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSignup}>Sign Up</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupModal;
