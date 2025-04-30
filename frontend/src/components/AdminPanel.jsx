import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const type = params.get('type');

  const title = type === 'users' ? 'New User Approvals' : 'Pending Opportunities';

  return (
    <div className="container mt-4">
      <h4>{title}</h4>

      {type === 'users' && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role Requested</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Victor Akolo</td>
              <td>va@gmail.com</td>
              <td>Student</td>
              <td><button className="btn btn-success btn-sm">Approve</button></td>
            </tr>
            <tr>
              <td>Prince De-Graft</td>
              <td>pd@gmail.com</td>
              <td>Faculty</td>
              <td><button className="btn btn-success btn-sm">Approve</button></td>
            </tr>
          </tbody>
        </table>
      )}

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
            <tr>
              <td>Campus Cleanup</td>
              <td>Help clean up the quad area on Saturday.</td>
              <td>user1@gmail.com</td>
              <td><button className="btn btn-success btn-sm">Approve</button></td>
            </tr>
            <tr>
              <td>Food Drive</td>
              <td>Assist in organizing the local food drive.</td>
              <td>user2@gmail.com</td>
              <td><button className="btn btn-success btn-sm">Approve</button></td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="text-center">
        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
