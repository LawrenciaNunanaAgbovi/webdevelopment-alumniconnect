import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Profile = ({ user, setAuth, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth('none');
    setUser(null);
    navigate('/');
  };

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <p>User not found.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body text-center">
          <img
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          <h4 className="card-title">{user.name}</h4>
          <p className="mb-1"><strong>Username:</strong> {user.username}</p>
          <p className="mb-1"><strong>Company:</strong> {user.company || 'N/A'}</p>
          <p className="mb-1"><strong>Title:</strong> {user.title || 'N/A'}</p>
          <p className="mb-1"><strong>Graduation Year:</strong> {user.graduationYear || 'N/A'}</p>
          <p className="mb-1"><strong>Major:</strong> {user.major || 'N/A'}</p>
          <p className="mb-1"><strong>Email:</strong> {user.email}</p>
          <p className="mb-1">
            <strong>LinkedIn:</strong>{' '}
            {user.linkedin ? (
              <a href={user.linkedin} target="_blank" rel="noreferrer">
                LinkedIn Profile
              </a>
            ) : 'N/A'}
          </p>

          <div className="d-flex justify-content-center gap-2 mt-3">
            <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
              Back to Home
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
