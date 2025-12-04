import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import TeamSection from '../components/TeamSection';
import ContactForm from '../components/ContactForm';
import { getFeaturedProperties } from '../services/propertyService';
import type { Property } from '../types';
import '../styles/Home.css';

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getFeaturedProperties();
      setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  const handleMessengerRedirect = () => {
    window.open('https://www.messenger.com/t/61565177813080', '_blank');
  };

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
          <h1 className="hero-title">Explore Top Listings</h1>
          <p className="hero-subtitle">
            Find Your Dream Home with cebuhomesbyjelann.com
          </p>
          <p className="hero-description">
            Here at cebuhomesbyjelann.com, finding your ideal property is simple. Discover a wide range of residential real estate options tailored to your lifestyle and budget.
          </p>
          <button className="hero-chat-btn" onClick={handleMessengerRedirect}>
            Let's Chat
          </button>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section fade-in-section">
        <div className="container">
          <h2 className="section-title">Search Your Ideal Property</h2>
          <SearchBar />
        </div>
      </section>

      {/* Smart Picks Section */}
      <section className="smart-picks-section fade-in-section">
        <div className="container">
          <h2 className="smart-picks-title">Smart Picks</h2>
          
          {/* Featured Condominiums */}
          <div className="featured-category">
            <div className="category-header">
              <h3 className="category-title">Featured Properties: Condominium</h3>
              <Link to="/properties?type=Condominium" className="view-all-link">View All →</Link>
            </div>
            <p className="category-description">
              Handpicked for its location, value, and potential. A great find for homebuyers or investors—limited units available.
            </p>
            <div className="properties-grid">
              {loading ? (
                <p>Loading properties...</p>
              ) : (
                properties.filter(p => p.type === 'Condominium' && p.featured).slice(0, 3).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>
          </div>

          {/* Featured House and Lots */}
          <div className="featured-category">
            <div className="category-header">
              <h3 className="category-title">Featured Homes: House and Lot</h3>
              <Link to="/properties?type=House and Lot" className="view-all-link">View All →</Link>
            </div>
            <p className="category-description">
              Discover homes designed for the comfort and happiness your family deserves. 
              Each property offers space to grow, privacy to enjoy, and a peaceful community to call your own. 
              Built with lasting value and thoughtful design, these homes provide the perfect place to create memories that last a lifetime.
            </p>
            <div className="properties-grid">
              {loading ? (
                <p>Loading properties...</p>
              ) : (
                properties.filter(p => p.type === 'House and Lot' && p.featured).slice(0, 3).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>
          </div>

          {/* Featured Rentals */}
          <div className="featured-category">
            <div className="category-header">
              <h3 className="category-title">Featured: Rentals</h3>
              <Link to="/properties?type=Rental" className="view-all-link">View All →</Link>
            </div>
            <p className="category-description">
              Explore a range of rental properties designed to fit your lifestyle and business needs. 
              From modern condominiums and spacious house and lots to prime office spaces and secure warehouses, 
              we offer options that combine convenience, value, and flexibility. 
              Find the perfect space — whether for living, working, or growing your investment.
            </p>
            <div className="properties-grid">
              {loading ? (
                <p>Loading properties...</p>
              ) : (
                properties.filter(p => p.type === 'Rental' && p.featured).slice(0, 3).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="recent-section fade-in-section">
        <div className="container">
          <h2 className="section-title">Recent Listings</h2>
          <div className="properties-grid">
            {properties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
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
              <h3>Property Sales & Investment</h3>
              <p>Assisting clients in buying pre-selling and ready-for-occupancy projects from top developers.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>Pre-Selling Opportunities</h3>
              <p>Get early access to new developments at exclusive introductory prices.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Home Buying Guidance</h3>
              <p>Step-by-step support in finding the right property for your lifestyle and budget.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏦</div>
              <h3>Bank Loan Assistance</h3>
              <p>We connect you with trusted banks and simplify your financing process.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔑</div>
              <h3>Property Leasing & Management</h3>
              <p>From finding tenants to managing rentals, we make property ownership effortless.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">�</div>
              <h3>Documentation & Titling</h3>
              <p>Complete assistance with property documentation, title processing, and legal requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <div className="fade-in-section">
        <TeamSection />
      </div>

      {/* Contact Form Section */}
      <div className="fade-in-section">
        <ContactForm />
      </div>


    </div>
  );
};

export default Home;
