import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const locations = ['Cebu', 'Bohol', 'Palawan', 'Davao'];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">cebuhomesbyjelann.com</span>
        </Link>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          
          <li 
            className="navbar-item dropdown"
            onMouseEnter={() => setIsPropertiesOpen(true)}
            onMouseLeave={() => setIsPropertiesOpen(false)}
          >
            <span className="navbar-link">
              Properties <span className="dropdown-arrow">▼</span>
            </span>
            {isPropertiesOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link 
                    to="/properties?status=preselling"
                    className="dropdown-link"
                    onClick={() => {
                      setIsPropertiesOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Preselling Projects
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/properties?status=for-sale"
                    className="dropdown-link"
                    onClick={() => {
                      setIsPropertiesOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    For Sale
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/properties?status=for-rent"
                    className="dropdown-link"
                    onClick={() => {
                      setIsPropertiesOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    For Rent
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li 
            className="navbar-item dropdown"
            onMouseEnter={() => setIsLocationOpen(true)}
            onMouseLeave={() => setIsLocationOpen(false)}
          >
            <span className="navbar-link">
              Location <span className="dropdown-arrow">▼</span>
            </span>
            {isLocationOpen && (
              <ul className="dropdown-menu">
                {locations.map((location) => (
                  <li key={location}>
                    <Link 
                      to={`/properties?location=${encodeURIComponent(location)}`}
                      className="dropdown-link"
                      onClick={() => {
                        setIsLocationOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      {location}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="navbar-item">
            <Link 
              to="/careers" 
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Careers
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
