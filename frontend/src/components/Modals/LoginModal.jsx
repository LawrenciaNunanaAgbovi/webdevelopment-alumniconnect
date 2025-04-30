
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const LoginModal = ({ show, onClose }) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton><Modal.Title>Login</Modal.Title></Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Close</Button>
      <Button variant="primary">Login</Button>
    </Modal.Footer>
  </Modal>
);

export default LoginModal;
