import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://138.197.93.75:3001/api';

const AdminPanel = ({ user }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const type = params.get('type');
  const title = type === 'users' ? 'New User Approvals' : 'Pending Opportunities';

  const [pendingOpportunities, setPendingOpportunities] = useState([]);

  useEffect(() => {
    if (type === 'opportunities') {
      fetch(`${API_URL}/opportunities/pending`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setPendingOpportunities(data);
          } else {
            console.error('Unexpected response format:', data);
            setPendingOpportunities([]);
          }
        })
        .catch(err => {
          console.error('Failed to fetch pending opportunities:', err);
          setPendingOpportunities([]);
        });
    }
  }, [type]);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${API_URL}/opportunities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          approved: true,
          approved_by: user?.email || 'Admin',
        }),
      });

      if (!res.ok) throw new Error('Approval failed');

      setPendingOpportunities(prev => prev.filter(op => op._id !== id));
      alert('Opportunity approved!');
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
                    <button className="btn btn-success btn-sm" onClick={() => handleApprove(opp._id)}>
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No pending opportunities</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Add user approval logic here if needed */}
      <div className="text-center">
        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
