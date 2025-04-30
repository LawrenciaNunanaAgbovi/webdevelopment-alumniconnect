
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body text-center">
        <img 
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1744654869~exp=1744658469~hmac=7ee82a4718070c0e01326c450f5f03dab08f405a6ad13ce380e72ba7381facff&w=1480" 
            alt="Profile" 
            className="rounded-circle mb-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
          />
          <h4 className="card-title">Lawrencia Agbovi</h4>
          <p className="mb-1"><strong>School:</strong> Stetson University</p>
          <p className="mb-1"><strong>Graduating Year:</strong> 2026</p>
          <p className="mb-1"><strong>Major:</strong> Computer Science</p>
          <p className="mb-1"><strong>Email:</strong> lagbovi@stetson.edu</p>
          <p className="mb-1">
            <strong>LinkedIn:</strong>{' '}
            <a
              href="https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn Profile
            </a>
          </p>
          <p className="mt-3">
            <strong>Bio:</strong><br />
            Passionate developer who loves solving real-world problems with tech.
          </p>
          <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
