import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isForSaleOpen, setIsForSaleOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const forSaleTypes = ['Condominium', 'House and Lot', 'Rental'];
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

          <li 
            className="navbar-item dropdown"
            onMouseEnter={() => setIsForSaleOpen(true)}
            onMouseLeave={() => setIsForSaleOpen(false)}
          >
            <span className="navbar-link">
              For Sale <span className="dropdown-arrow">▼</span>
            </span>
            {isForSaleOpen && (
              <ul className="dropdown-menu">
                {forSaleTypes.map((type) => (
                  <li key={type}>
                    <Link 
                      to={`/properties?type=${encodeURIComponent(type)}`}
                      className="dropdown-link"
                      onClick={() => {
                        setIsForSaleOpen(false);
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
