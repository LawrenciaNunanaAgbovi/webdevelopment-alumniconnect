import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ auth, setAuth, setAdminView, setShowLogin, setShowSignup }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="btn-group my-4 d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {auth === 'admin'
            ? 'Admin logged in'
            : auth === 'user'
            ? 'User logged in'
            : 'Not logged in'}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                setAuth('none');
                setAdminView(null);
                navigate('/');
              }}
            >
              Not logged in
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => setShowSignup(true)}
            >
              Signup
            </button>
          </li>
        </ul>
      </div>

      <div className="container mt-3">
        <h2 className="mb-4 text-start">Stetson's Latest</h2>
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card mb-3">
              <h3 className="card-header">Hackathon 2025</h3>
              <div className="card-body">
                <h5 className="card-title">Innovation Meets Collaboration</h5>
                <h6 className="card-subtitle text-muted">Hosted by Stetson's Computer Science Dept.</h6>
              </div>
              <img
                src="https://www.stetson.edu/home/media/images/og-image.jpg"
                className="card-img-top"
                alt="Hackathon"
              />
              <div className="card-body">
                <p className="card-text">
                  Over 120 students came together for Stetson's annual Hackathon this past weekend.
                  The winning team developed a mobile app that helps students locate study rooms.
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">24-hour coding challenge</li>
                <li className="list-group-item">Judges from Google & Amazon</li>
                <li className="list-group-item">Free swag for attendees</li>
              </ul>
              <div className="card-footer text-muted">Posted 3 days ago</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card mb-3">
              <h3 className="card-header">Spring Career Expo</h3>
              <div className="card-body">
                <h5 className="card-title">Explore Internship Opportunities</h5>
                <h6 className="card-subtitle text-muted">Career Center</h6>
              </div>
              <img
                src="https://images.squarespace-cdn.com/content/v1/5f0893d2fe49967f7825d046/1627938686505-5FCF7VDKI1RYO4W4QA6E/iso-aire-hepa-air-purifier-college-university.jpg"
                className="card-img-top"
                alt="Career Expo"
              />
              <div className="card-body">
                <p>
                  Over 40 companies came to recruit interns and full-time hires. Resume workshops were also offered.
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Apple, Deloitte, NASA attended</li>
              </ul>
              <div className="card-footer text-muted">5 days ago</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card mb-3">
              <h3 className="card-header">Green Campus Day</h3>
              <div className="card-body">
                <h5 className="card-title">Students Go Green</h5>
                <h6 className="card-subtitle text-muted">Eco-Stetson Club</h6>
              </div>
              <img
                src="https://www.stetson.edu/law/about/home/media/plaza-mayor.jpg"
                className="card-img-top"
                alt="Green Campus"
              />
              <div className="card-body">
                <p>
                  300+ students helped clean trails, plant trees, and promote sustainability on campus.
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">75 trees planted</li>
                <li className="list-group-item">1,200 lbs recycled</li>
              </ul>
              <div className="card-footer text-muted">1 week ago</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
