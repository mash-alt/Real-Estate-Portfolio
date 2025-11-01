import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  const propertyTypes = ['Condominium', 'House and Lot', 'Lot-only', 'Office Space'];

  const handleMessengerRedirect = () => {
    // Replace with actual messenger link
    window.open('https://m.me/YOUR_PAGE_ID', '_blank');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">Prime Realty</span>
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
            <Link to="/properties" className="navbar-link">
              Properties <span className="dropdown-arrow">▼</span>
            </Link>
            {isPropertiesOpen && (
              <ul className="dropdown-menu">
                {propertyTypes.map((type) => (
                  <li key={type}>
                    <Link 
                      to={`/properties?type=${encodeURIComponent(type)}`}
                      className="dropdown-link"
                      onClick={() => {
                        setIsPropertiesOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      {type}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="navbar-item">
            <button 
              className="navbar-button contact-btn"
              onClick={handleMessengerRedirect}
            >
              💬 Chat With Us
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
