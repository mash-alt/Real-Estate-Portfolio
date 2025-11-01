import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import TeamSection from '../components/TeamSection';
import { properties } from '../data/mockData';
import '../styles/Home.css';

const Home = () => {
  const featuredProperties = properties.filter(p => p.featured);
  const recentProperties = properties.slice(0, 6);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));

    return () => {
      fadeElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Property</h1>
          <p className="hero-subtitle">
            Discover exceptional real estate opportunities across the Philippines
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Properties</span>
            </div>
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section fade-in-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Welcome to [Your Site Name]</h2>
              <p>
                With over 15 years of experience in the Philippine real estate market, 
                we are committed to helping you find the perfect property that matches 
                your lifestyle and investment goals.
              </p>
              <p>
                Our team of professional brokers and consultants provides personalized 
                service, ensuring a smooth and successful property transaction from 
                start to finish.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600" 
                alt="About [Your Site Name]" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section fade-in-section">
        <div className="container">
          <h2 className="section-title">Search Your Ideal Property</h2>
          <SearchBar />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-section fade-in-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Properties</h2>
            <Link to="/properties" className="view-all-link">View All →</Link>
          </div>
          <div className="properties-grid">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="recent-section fade-in-section">
        <div className="container">
          <h2 className="section-title">Recent Listings</h2>
          <div className="properties-preview">
            {recentProperties.map((property) => (
              <div key={property.id} className="property-preview-card">
                <img src={property.images[0]} alt={property.title} />
                <div className="preview-content">
                  <h4>{property.title}</h4>
                  <p>{property.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section fade-in-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Property Sales</h3>
              <p>Comprehensive assistance in buying and selling residential and commercial properties</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Investment Consulting</h3>
              <p>Expert guidance on property investments and portfolio management</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔑</div>
              <h3>Property Management</h3>
              <p>Full-service property management solutions for landlords and investors</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>Legal Assistance</h3>
              <p>Complete legal support for property transactions and documentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <div className="fade-in-section">
        <TeamSection />
      </div>

      {/* CTA Section */}
      <section className="cta-section fade-in-section">
        <div className="container">
          <h2>Ready to Find Your Perfect Property?</h2>
          <p>Connect with our team of experts today and let us help you achieve your real estate goals</p>
          <button 
            className="cta-button"
            onClick={() => window.open('https://m.me/YOUR_PAGE_ID', '_blank')}
          >
            💬 Start a Conversation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
