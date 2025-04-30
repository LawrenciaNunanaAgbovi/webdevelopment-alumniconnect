import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Home from './components/Home';
import Users from './components/Users';
import Opportunities from './components/Opportunities';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useState('none');
  const [adminView, setAdminView] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        auth={auth}
        setAuth={setAuth}
        setAdminView={setAdminView}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        navigate={navigate}
      />

      <div className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                auth={auth}
                setAuth={setAuth}
                setAdminView={setAdminView}
                navigate={navigate}
              />
            }
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>

      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
      <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />
      <Footer />
    </div>
  );
}

export default AppWrapper;
