import { Link } from 'react-router-dom';
import type { Property } from '../types';
import '../styles/PropertyCard.css';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/properties/${property.id}`} className="property-card">
      <div className="property-card-image">
        <img 
          src={property.images[0]} 
          alt={property.title}
          loading="lazy"
          decoding="async"
        />
        {property.featured && <span className="featured-badge">Featured</span>}
        <span className="property-type-badge">{property.type}</span>
      </div>
      
      <div className="property-card-content">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">📍 {property.location}</p>
        <p className="property-price">{formatPrice(property.price)}</p>
        
        <div className="property-details">
          <span>📏 {property.area} sqm</span>
          {property.bedrooms && <span>🛏️ {property.bedrooms} beds</span>}
          {property.bathrooms && <span>🚿 {property.bathrooms} baths</span>}
        </div>
        
        <p className="property-description">{property.description.substring(0, 100)}...</p>
      </div>
    </Link>
  );
};

export default PropertyCard;
