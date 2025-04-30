
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const SignupModal = ({ show, onClose }) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton><Modal.Title>Signup</Modal.Title></Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Close</Button>
      <Button variant="primary">Signup</Button>
    </Modal.Footer>
  </Modal>
);

export default SignupModal;
