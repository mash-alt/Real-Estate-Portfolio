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
  const [copySuccess, setCopySuccess] = useState(false);

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
    window.open('https://www.messenger.com/t/61565177813080', '_blank');
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareInstagram = () => {
    // Instagram doesn't have direct sharing URL, so we'll copy link and show instruction
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  return (
    <div className="property-detail">
      {copySuccess && (
        <div className="copy-toast">
          ✓ Link copied to clipboard!
        </div>
      )}
      
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
              <a href="mailto:jelannestradaleyson@gmail.com">jelannestradaleyson@gmail.com</a>
            </div>
            <div className="contact-item">
              <span>📞</span>
              <a href="tel:+639277297317">+63 927 729 7317</a>
            </div>
          </div>

          <div className="share-section">
            <h4>Share this property</h4>
            <div className="share-buttons">
              <button onClick={handleShareFacebook} aria-label="Share on Facebook" title="Share on Facebook">
                📘 Facebook
              </button>
              <button onClick={handleShareInstagram} aria-label="Share on Instagram" title="Share on Instagram">
                📷 Instagram
              </button>
              <button onClick={handleCopyLink} aria-label="Copy Link" title="Copy Link">
                🔗 Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
