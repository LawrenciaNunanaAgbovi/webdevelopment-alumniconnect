import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://138.197.93.75:3001/api';

const MessageDetail = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/messages`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((m) => m._id === id);
        setMessage(found);
      })
      .catch((err) => console.error('Failed to load message:', err));
  }, [id]);

  if (!message) return <div className="container mt-4">Loading message...</div>;

  return (
    <div className="container mt-4">
      <h4>{message.title}</h4>
      <p><strong>From:</strong> {message.senderName}</p>
      <p>{message.title}</p>
      <p>{message.body}</p>
    </div>
  );
};

export default MessageDetail;
