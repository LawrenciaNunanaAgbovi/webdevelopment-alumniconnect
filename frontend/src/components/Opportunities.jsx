import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewOpportunityModal from './Modals/NewOpportunityModal';

function Opportunities({ user }) {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [opportunitySearch, setOpportunitySearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://138.197.93.75:3001/api';

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/opportunities?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        setOpportunities(data.opportunities || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching opportunities:', err);
        setLoading(false);
      });
  }, [currentPage, showNewModal]);

  const handleSearch = (e) => {
    setOpportunitySearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredOpportunities = opportunities.filter(op =>
    op.title?.toLowerCase().includes(opportunitySearch.toLowerCase()) ||
    op.description?.toLowerCase().includes(opportunitySearch.toLowerCase())
  );

  const handleSubmitOpportunity = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/opportunities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // important to send cookies for authentication
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create opportunity');
      }
  
      alert('Opportunity submitted for approval.');
      setShowNewModal(false);
      // Optionally refetch opportunities
      setCurrentPage(1);
    } catch (err) {
      alert(err.message);
    }
  };
  

  const handleBackToHome = () => navigate('/');

  return (
    <div className="container mt-4">
      {!selectedOpportunity ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Opportunities</h4>
            <button className="btn btn-success" onClick={() => setShowNewModal(true)}>
              + Post New Opportunity
            </button>
          </div>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search opportunities..."
            value={opportunitySearch}
            onChange={handleSearch}
          />

          <div className="row">
            {filteredOpportunities.map((op, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{op.title || 'Untitled Opportunity'}</h5>
                    <p className="card-text">{op.description?.substring(0, 100) || 'No description'}...</p>
                    <button className="btn btn-primary" onClick={() => setSelectedOpportunity(op)}>
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredOpportunities.length === 0 && (
            <div className="alert alert-info">No opportunities found.</div>
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

          <NewOpportunityModal
            show={showNewModal}
            onHide={() => setShowNewModal(false)}
            onSubmit={handleSubmitOpportunity} // ✅ Make sure this is passed
            postedBy={user?.email || 'Unknown'} // or user?.name if you prefer
          />


        </>
      ) : (
        <div className="card mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h4 className="card-title">{selectedOpportunity.title || 'No Title'}</h4>
            <p><strong>Description:</strong><br />{selectedOpportunity.description || 'No description available.'}</p>
            <p><strong>Posted By:</strong> {selectedOpportunity.posted_by || 'N/A'}</p>
            <p><strong>Type:</strong> {selectedOpportunity.type || 'N/A'}</p>
            <p><strong>Paid:</strong> {selectedOpportunity.is_paid ? 'Yes' : 'No'}</p>
            {selectedOpportunity.is_paid && (
              <p><strong>Amount:</strong> ${selectedOpportunity.amount || '0.00'}</p>
            )}
            <p><strong>Needs Approval:</strong> {selectedOpportunity.needs_approval ? 'Yes' : 'No'}</p>
            <p><strong>Approved:</strong> {selectedOpportunity.approved ? 'Yes' : 'No'}</p>
            <p><strong>Approved By:</strong> {selectedOpportunity.approved_by || 'N/A'}</p>
            <p><strong>Posted On:</strong> {selectedOpportunity.createdAt ? new Date(selectedOpportunity.createdAt).toLocaleDateString() : 'N/A'}</p>
            <button className="btn btn-outline-secondary mt-3" onClick={() => setSelectedOpportunity(null)}>
              Back to Opportunities
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Opportunities;
