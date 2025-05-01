import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const LoginModal = ({ show, onClose, setAuth, setUser, navigate, setShowSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Step 1: Login and receive cookies
      const res = await fetch('http://138.197.93.75:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      // Step 2: Fetch authenticated user profile using cookies
      const userRes = await fetch('http://138.197.93.75:3001/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (!userRes.ok) throw new Error('Failed to fetch user profile');
      const user = await userRes.json();

      // Step 3: Set global state and redirect
      setAuth(user.role || role); // just in case role wasn't chosen
      setUser(user);
      onClose();
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton><Modal.Title>Login</Modal.Title></Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="link" onClick={() => { onClose(); setShowSignup(true); }}>
          Don’t have an account? Sign up
        </Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleLogin}>Login</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
