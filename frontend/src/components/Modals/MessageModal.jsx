import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const MessageModal = ({
  show,
  onClose,
  message,
  setMessage,
  onSend,
  isReply = false,
}) => {
  const handleSend = () => {
    if (
      !message.body ||
      (!isReply && (!message.title || !message.recipientName || !message.recipientEmail))
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    onSend(message); // message already has all fields
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isReply ? 'Reply Message' : `Send Message`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isReply && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Send To (Name)</Form.Label>
              <Form.Control
                type="text"
                value={message.recipientName}
                onChange={(e) =>
                  setMessage((prev) => ({ ...prev, recipientName: e.target.value }))
                }
                placeholder="Recipient's full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Recipient Email</Form.Label>
              <Form.Control
                type="email"
                value={message.recipientEmail}
                onChange={(e) =>
                  setMessage((prev) => ({ ...prev, recipientEmail: e.target.value }))
                }
                placeholder="Recipient's email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={message.title}
                onChange={(e) =>
                  setMessage((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter a title"
              />
            </Form.Group>
          </>
        )}

        <Form.Group>
          <Form.Label>{isReply ? 'Your Reply' : 'Message'}</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={message.body}
            onChange={(e) =>
              setMessage((prev) => ({ ...prev, body: e.target.value }))
            }
            placeholder="Write your message..."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSend}>
          {isReply ? 'Send Reply' : 'Send Message'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
