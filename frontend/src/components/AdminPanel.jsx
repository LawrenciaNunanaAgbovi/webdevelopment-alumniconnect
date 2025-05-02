import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://138.197.93.75:3001/api';

const AdminPanel = ({ user }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const type = params.get('type'); 
  const title = type === 'users' ? 'New User Approvals' : 'Pending Opportunities';

  const [pendingOpportunities, setPendingOpportunities] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    if (type === 'opportunities') {
      fetch(`${API_URL}/opportunities/pending`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => setPendingOpportunities(Array.isArray(data) ? data : []))
        .catch(err => {
          console.error('Error fetching opportunities:', err);
          setPendingOpportunities([]);
        });
    }

    if (type === 'users') {
      fetch(`${API_URL}/users/unapproved`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => setPendingUsers(Array.isArray(data) ? data : []))
        .catch(err => {
          console.error('Error fetching unapproved users:', err);
          setPendingUsers([]);
        });
    }
  }, [type]);

  const handleApproveOpportunity = async (id) => {
    try {
      const res = await fetch(`${API_URL}/opportunities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ approved: true, approved_by: user?.email || 'Admin' }),
      });

      if (!res.ok) throw new Error('Approval failed');
      setPendingOpportunities(prev => prev.filter(op => op._id !== id));
      alert('Opportunity approved!');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleApproveUser = async (id) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}/approve`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('User approval failed');
      setPendingUsers(prev => prev.filter(u => u._id !== id));
      alert('User approved!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h4>{title}</h4>

      {type === 'opportunities' && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Submitted By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingOpportunities.length > 0 ? (
              pendingOpportunities.map((opp) => (
                <tr key={opp._id}>
                  <td>{opp.title}</td>
                  <td>{opp.description}</td>
                  <td>{opp.posted_by}</td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => handleApproveOpportunity(opp._id)}>
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="text-center">No pending opportunities</td></tr>
            )}
          </tbody>
        </table>
      )}

      {type === 'users' && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Major</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.length > 0 ? (
              pendingUsers.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.major}</td>
                  <td>{u.company}</td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => handleApproveUser(u._id)}>
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center">No users pending approval</td></tr>
            )}
          </tbody>
        </table>
      )}

      <div className="text-center mt-3">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
