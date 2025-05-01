import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const NewOpportunityModal = ({ show, onClose, onSubmit, postedBy }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: '',
    is_paid: false,
    amount: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      return setError('Title and description are required.');
    }

    const newOpportunity = {
      ...form,
      posted_by: postedBy,
      needs_approval: true,
      approved: false,
      amount: form.is_paid ? parseFloat(form.amount) || 0 : 0,
    };

    onSubmit(newOpportunity);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Post New Opportunity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" value={form.title} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Type</Form.Label>
            <Form.Control name="type" value={form.type} onChange={handleChange} placeholder="Internship, Volunteering, Job..." />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="Is this a paid opportunity?"
              name="is_paid"
              checked={form.is_paid}
              onChange={handleChange}
            />
          </Form.Group>

          {form.is_paid && (
            <Form.Group className="mb-2">
              <Form.Label>Amount ($)</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Submit Opportunity</Button>
       </Modal.Footer>
    </Modal>
  );
};

export default NewOpportunityModal;
