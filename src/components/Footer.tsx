import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>cebuhomesbyjelann.com</h3>
          <p>Your trusted partner in finding the perfect property in the Philippines.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/properties">Properties</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Property Types</h4>
          <ul>
            <li><a href="/properties?type=Condominium">Condominium</a></li>
            <li><a href="/properties?type=House and Lot">House and Lot</a></li>
            <li><a href="/properties?type=Rental">Rental</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: kyleenzocatarig@gmail.com</p>
          <p>Phone: +63 927 729 7317</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} cebuhomesbyjelann.com. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
