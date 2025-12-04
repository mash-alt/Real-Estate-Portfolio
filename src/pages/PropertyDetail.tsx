import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../services/propertyService';
import type { Property } from '../types';
import '../styles/PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [_, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        const data = await getPropertyById(id);
        setProperty(data);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property not found</h2>
        <button onClick={() => navigate('/properties')}>Back to Properties</button>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleInquiry = () => {
    window.open('https://m.me/YOUR_PAGE_ID', '_blank');
  };

  return (
    <div className="property-detail">
      <button className="back-button" onClick={() => navigate('/properties')}>
        ← Back to Properties
      </button>

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="main-image">
          <img 
            src={property.images[currentImageIndex]} 
            alt={property.title}
            loading="eager"
            decoding="async"
          />
          {property.images.length > 1 && (
            <>
              <button className="gallery-btn prev" onClick={prevImage}>‹</button>
              <button className="gallery-btn next" onClick={nextImage}>›</button>
              <div className="image-counter">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </>
          )}
        </div>
        
        {property.images.length > 1 && (
          <div className="thumbnail-gallery">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`View ${idx + 1}`}
                className={idx === currentImageIndex ? 'active' : ''}
                onClick={() => setCurrentImageIndex(idx)}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Info */}
      <div className="property-info-container">
        <div className="property-main-info">
          <div className="property-header">
            <div>
              <span className="property-type-tag">{property.type}</span>
              <h1>{property.title}</h1>
              <p className="location">📍 {property.location}, Philippines</p>
            </div>
            <div className="price-tag">
              {formatPrice(property.price)}
            </div>
          </div>

          <div className="property-specs">
            <div className="spec">
              <span className="spec-icon">📏</span>
              <div>
                <span className="spec-value">{property.area}</span>
                <span className="spec-label">sqm</span>
              </div>
            </div>
            {property.bedrooms && (
              <div className="spec">
                <span className="spec-icon">🛏️</span>
                <div>
                  <span className="spec-value">{property.bedrooms}</span>
                  <span className="spec-label">Bedrooms</span>
                </div>
              </div>
            )}
            {property.bathrooms && (
              <div className="spec">
                <span className="spec-icon">🚿</span>
                <div>
                  <span className="spec-value">{property.bathrooms}</span>
                  <span className="spec-label">Bathrooms</span>
                </div>
              </div>
            )}
          </div>

          <div className="property-description">
            <h2>About This Property</h2>
            <p>{property.description}</p>
          </div>

          <div className="property-features">
            <h2>Features & Amenities</h2>
            <ul className="features-list">
              {property.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="feature-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Card */}
        <div className="contact-card">
          <h3>Interested in this property?</h3>
          <p>Contact us for more information or to schedule a viewing</p>
          
          <button className="inquiry-button" onClick={handleInquiry}>
            💬 Send Inquiry
          </button>
          
          <div className="contact-info">
            <div className="contact-item">
              <span>📧</span>
              <a href="mailto:info@primerealty.com">info@primerealty.com</a>
            </div>
            <div className="contact-item">
              <span>📞</span>
              <a href="tel:+639123456789">+63 912 345 6789</a>
            </div>
          </div>

          <div className="share-section">
            <h4>Share this property</h4>
            <div className="share-buttons">
              <button aria-label="Share on Facebook">📘</button>
              <button aria-label="Share on Twitter">🐦</button>
              <button aria-label="Copy Link">🔗</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
