import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navbar = ({
  auth,
  setAuth,
  setAdminView,
  setShowLogin,
  setShowSignup
}) => {
  const navigate = useNavigate();

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
              <button className="nav-link btn btn-link p-0" onClick={() => {
                navigate('/users');
                setAdminView(null);
              }}>
                Users
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link p-0" onClick={() => {
                navigate('/opportunities');
                setAdminView(null);
              }}>
                Opportunities
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link p-0" onClick={() => {
                navigate('/profile');
                setAdminView(null);
              }}>
                Profile
              </button>
            </li>

            {auth === 'admin' && (
              <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    className="nav-link p-0"
                    id="adminDropdown"
                    style={{ position: 'relative', zIndex: 1000 }}
                  >
                    Admin Panel
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow mt-2 show-on-top">
                    <Dropdown.Item onClick={() => navigate('/admin?type=opportunities')}>
                      Approve Posted Opportunities
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('/admin?type=users')}>
                      Approve New User
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </ul>
        )}

        {auth === 'none' && (
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={() => setShowLogin(true)}>Login</button>
            <button className="btn btn-primary" onClick={() => setShowSignup(true)}>Signup</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
