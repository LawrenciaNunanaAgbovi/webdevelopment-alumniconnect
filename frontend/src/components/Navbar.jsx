import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MessageModal from './Modals/MessageModal';

const Navbar = ({
  auth,
  setAuth,
  setAdminView,
  setShowLogin,
  setShowSignup,
}) => {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // ✉️ Modal-related state
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState({
    title: '',
    body: '',
    recipientName: '',
    recipientEmail: '',
  });
  

  const API_URL = import.meta.env.VITE_API_URL || 'http://138.197.93.75:3001/api';

  const user = messages.length > 0 ? { name: messages[0]?.senderName } : { name: '' };

  // Handle sending a message
  const handleSendMessage = (msgData) => {
    fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(msgData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Message sent:', data);
        setShowMessageModal(false);
        setMessage({ title: '', body: '', recipientName: '', recipientEmail: '' });
      })
      .catch((err) => {
        console.error('Error sending message:', err);
        alert('Failed to send message. Please check recipient email.');
      });
  };
  

  useEffect(() => {
    if (auth === 'admin') {
      fetch(`${API_URL}/opportunities`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          const unapproved = (data.opportunities || []).filter((op) => !op.approved).length;
          setPendingCount(unapproved);
        })
        .catch((err) => console.error('Error fetching opportunities:', err));
    }
  }, [auth]);

  useEffect(() => {
    if (auth !== 'none') {
      fetch(`${API_URL}/messages`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages(data || []);
          const unread = data.filter((msg) => !msg.read).length;
          setUnreadCount(unread);
        })
        .catch((err) => console.error('Error fetching messages:', err));
    }
  }, [auth]);

  return (
    <nav className="navbar navbar-expand-lg bg-light position-relative" data-bs-theme="light" style={{ height: '60px' }}>
      <div className="container-fluid h-100 d-flex align-items-center justify-content-end position-relative">
        <div className="position-absolute start-0 ps-4">
          <a className="navbar-brand mb-0 h1" href="#" onClick={() => {
            navigate('/');
            setAdminView(null);
          }}>
            SU
          </a>
        </div>

        {(auth === 'user' || auth === 'admin') && (
          <ul className="navbar-nav d-flex flex-row align-items-center gap-4 mb-0 h-100">
            <li className="nav-item">
              <button className="nav-link btn btn-link p-0" onClick={() => navigate('/users')}>
                Users
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link p-0" onClick={() => navigate('/opportunities')}>
                Opportunities
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link p-0" onClick={() => navigate('/profile')}>
                Profile
              </button>
            </li>

            {/* ✉️ Message Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="nav-link p-0 position-relative">
                ✉️
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                  </span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow mt-2">
                <Dropdown.Item onClick={() => setShowMessageModal(true)}>➕ Compose Message</Dropdown.Item>
                <Dropdown.Divider />
                {messages.length === 0 && <Dropdown.ItemText>No messages</Dropdown.ItemText>}
                {messages.map((msg, index) => (
                  <Dropdown.Item key={index} onClick={() => navigate(`/messages/${msg._id}`)}>
                    <strong>{msg.senderName}</strong>: {msg.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* Admin Panel */}
            {auth === 'admin' && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="nav-link p-0">
                  Admin Panel {pendingCount > 0 && <span style={{ color: 'red' }}>🔴</span>}
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow mt-2">
                  <Dropdown.Item onClick={() => navigate('/admin?type=opportunities')}>
                    Approve Posted Opportunities
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/admin?type=users')}>
                    Approve New User
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </ul>
        )}

        {/* 🟦 Login/Signup */}
        {auth === 'none' && (
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={() => setShowLogin(true)}>Login</button>
            <button className="btn btn-primary" onClick={() => setShowSignup(true)}>Signup</button>
          </div>
        )}

        {/* 📩 Message Modal */}
        <MessageModal
          show={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          message={message}
          setMessage={setMessage}
          onSend={handleSendMessage}
        />

      </div>
    </nav>
  );
};

export default Navbar;
