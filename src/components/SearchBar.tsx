import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PropertyType, Location } from '../types';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<PropertyType | ''>('');
  const [searchLocation, setSearchLocation] = useState<Location | ''>('');
  const [priceRange, setPriceRange] = useState<string>('');

  const propertyTypes: PropertyType[] = ['Condominium', 'House and Lot', 'Lot-only', 'Office Space'];
  const locations: Location[] = ['Cebu', 'Manila', 'Palawan', 'Boracay', 'Davao', 'Baguio', 'Iloilo'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchText) params.append('search', searchText);
    if (searchType) params.append('type', searchType);
    if (searchLocation) params.append('location', searchLocation);
    if (priceRange) params.append('priceRange', priceRange);
    
    navigate(`/properties?${params.toString()}`);
    // Scroll to top after navigation
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-field search-field-wide">
          <label>Search Keywords</label>
          <input 
            type="text"
            placeholder="Search by title, description, or features..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label>Property Type</label>
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value as PropertyType)}
          >
            <option value="">All Types</option>
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="search-field">
          <label>Location</label>
          <select 
            value={searchLocation} 
            onChange={(e) => setSearchLocation(e.target.value as Location)}
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="search-field">
          <label>Price Range</label>
          <select 
            value={priceRange} 
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Any Price</option>
            <option value="0-5000000">Under ₱5M</option>
            <option value="5000000-10000000">₱5M - ₱10M</option>
            <option value="10000000-15000000">₱10M - ₱15M</option>
            <option value="15000000-999999999">Above ₱15M</option>
          </select>
        </div>

        <button type="submit" className="search-button">
          🔍 Search Properties
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
