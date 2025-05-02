import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MessageModal from './Modals/MessageModal'; // make sure path is correct

const API_URL = import.meta.env.VITE_API_URL || 'http://138.197.93.75:3001/api';

const MessageDetail = ({ setUnreadCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState({ body: '' });

  useEffect(() => {
    fetch(`${API_URL}/messages`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((m) => m._id === id);
        setMessage(found);

        // Mark as read
        if (found && !found.read) {
          fetch(`${API_URL}/messages/${found._id}/read`, {
            method: 'PUT',
            credentials: 'include',
          });
          if (setUnreadCount) {
            setUnreadCount((prev) => Math.max(prev - 1, 0));
          }
        }
      })
      .catch((err) => console.error('Failed to load message:', err));
  }, [id]);

  const handleSendReply = async (messageId, replyBody) => {
    const res = await fetch(`${API_URL}/messages/${messageId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ body: replyBody }),
    });

    if (res.ok) {
      const updated = await res.json();
      setMessage(updated); 
      setShowReply(false);
      setReplyMessage({ body: '' });
    } else {
      alert('Failed to send reply');
    }
  };

  if (!message) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading message...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
        <div className="card-body">
          <h4 className="card-title mb-3">{message.title}</h4>
          <p className="mb-1"><strong>From:</strong> {message.senderName}</p>
          <p className="mb-1"><strong>To:</strong> {message.recipientName}</p>
          <hr />
          <p style={{ whiteSpace: 'pre-wrap' }}>{message.body}</p>

          {message.replies?.length > 0 && (
            <div className="mt-4">
              <h6>Replies</h6>
              {message.replies.map((reply, i) => (
                <div key={i} className="bg-light p-2 rounded mb-2">
                  <small className="text-muted">{new Date(reply.date).toLocaleString()}</small>
                  <p className="mb-0">{reply.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-footer d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={() => navigate('/users')}>
            Back to Users
          </button>
          <button className="btn btn-primary" onClick={() => setShowReply(true)}>
            Reply
          </button>
        </div>
      </div>

      <MessageModal
        show={showReply}
        onClose={() => setShowReply(false)}
        message={replyMessage}
        setMessage={setReplyMessage}
        onSend={(msg) => handleSendReply(message._id, msg.body)}
        isReply
      />
    </div>
  );
};

export default MessageDetail;
