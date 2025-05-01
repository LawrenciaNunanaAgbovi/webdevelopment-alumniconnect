import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://138.197.93.75:3001/api';

  
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/users?page=${currentPage}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        setUsers(data.users || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, [currentPage]);
  
  
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleBackToHome = () => navigate('/');


  
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.major?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {!selectedUser ? (
        <>
          <h4 className="mb-4">All Users</h4>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="row">
            {filteredUsers.map((user, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div
                  className="card text-white bg-primary h-100"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="card-header">{user.name}</div>
                  <div className="card-body">
                    <h5 className="card-title">{user.major}</h5>
                    <p className="card-text">{user.company} - {user.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredUsers.length === 0 && (
            <div className="alert alert-info">No users found matching your search.</div>
          )}

          <div className="d-flex justify-content-center mt-3">
            <div className="btn-group">
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                disabled={currentPage === 1}
              >
                &laquo;
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn ${currentPage === i + 1 ? 'btn-secondary' : 'btn-outline-secondary'}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </div>
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-outline-secondary" onClick={handleBackToHome}>
              Back to Home
            </button>
          </div>
        </>
      ) : (
        <div className="card mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body text-center">
            <img 
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" 
              alt="Profile" 
              className="rounded-circle mb-3"
              style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
            />
            <h4 className="card-title">{selectedUser.name}</h4>
            <p><strong>Username:</strong> {selectedUser.username || 'N/A'}</p>
            <p><strong>Major:</strong> {selectedUser.major || 'N/A'}</p>
            <p><strong>Graduation Year:</strong> {selectedUser.year_graduated || 'N/A'}</p>
            <p><strong>Company:</strong> {selectedUser.company || 'N/A'}</p>
            <p><strong>Title:</strong> {selectedUser.title || 'N/A'}</p>
            <p><strong>Email:</strong> {selectedUser.email || 'N/A'}</p>
            <p><strong>LinkedIn:</strong> {
              selectedUser.linkedin_link ? (
                <a href={selectedUser.linkedin_link} target="_blank" rel="noreferrer">
                  {selectedUser.linkedin_link}
                </a>
              ) : 'N/A'
            }</p>
            <p><strong>Joined:</strong> {
              selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'
            }</p>
            <button className="btn btn-outline-secondary mt-3" onClick={() => setSelectedUser(null)}>
              Back to Users
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
