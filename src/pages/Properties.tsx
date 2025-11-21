import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { properties as allProperties } from '../data/mockData';
import type { PropertyType, Location } from '../types';
import '../styles/Properties.css';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedType, setSelectedType] = useState<PropertyType | ''>('');
  const [selectedLocation, setSelectedLocation] = useState<Location | ''>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const propertyTypes: PropertyType[] = ['Condominium', 'House and Lot', 'Rental'];
  const locations: Location[] = ['Cebu', 'Bohol', 'Palawan', 'Davao'];

  useEffect(() => {
    const typeParam = searchParams.get('type') as PropertyType | null;
    const locationParam = searchParams.get('location') as Location | null;
    const searchParam = searchParams.get('search');
    
    if (typeParam) setSelectedType(typeParam);
    if (locationParam) setSelectedLocation(locationParam);
    if (searchParam) setSearchText(searchParam);
    
    // Scroll to top when search params change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  useEffect(() => {
    let filtered = allProperties;

    // Filter by search text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.features.some(f => f.toLowerCase().includes(searchLower)) ||
        p.location.toLowerCase().includes(searchLower)
      );
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(p => p.location === selectedLocation);
    }

    setFilteredProperties(filtered);
  }, [selectedType, selectedLocation, searchText]);

  const handleTypeFilter = (type: PropertyType | '') => {
    setSelectedType(type);
    const params = new URLSearchParams(searchParams);
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    setSearchParams(params);
  };

  const handleLocationFilter = (location: Location | '') => {
    setSelectedLocation(location);
    const params = new URLSearchParams(searchParams);
    if (location) {
      params.set('location', location);
    } else {
      params.delete('location');
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedType('');
    setSelectedLocation('');
    setSearchText('');
    setSearchParams({});
  };

  return (
    <div className="properties-page">
      <div className="properties-header">
        <h1>Explore Our Properties</h1>
        <p>Find your perfect property from our extensive listings</p>
      </div>

      <div className="properties-container">
        {/* Filter Sidebar */}
        <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="filter-header">
            <h2>Filters</h2>
            <button 
              className="filter-close"
              onClick={() => setIsFilterOpen(false)}
            >
              ✕
            </button>
          </div>

          {searchText && (
            <div className="active-search">
              <p>Searching for: <strong>{searchText}</strong></p>
              <button onClick={() => {
                setSearchText('');
                const params = new URLSearchParams(searchParams);
                params.delete('search');
                setSearchParams(params);
              }}>
                Clear search
              </button>
            </div>
          )}

          <div className="filter-section">
            <h3>Property Type</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${selectedType === '' ? 'active' : ''}`}
                onClick={() => handleTypeFilter('')}
              >
                All Types
              </button>
              {propertyTypes.map(type => (
                <button
                  key={type}
                  className={`filter-option ${selectedType === type ? 'active' : ''}`}
                  onClick={() => handleTypeFilter(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Location</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${selectedLocation === '' ? 'active' : ''}`}
                onClick={() => handleLocationFilter('')}
              >
                All Locations
              </button>
              {locations.map(location => (
                <button
                  key={location}
                  className={`filter-option ${selectedLocation === location ? 'active' : ''}`}
                  onClick={() => handleLocationFilter(location)}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Clear All Filters
          </button>
        </aside>

        {/* Properties Grid */}
        <main className="properties-main">
          <div className="properties-toolbar">
            <button 
              className="filter-toggle"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              🔍 Filter
            </button>
            <p className="results-count">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="properties-grid">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No properties found</h3>
              <p>Try adjusting your filters to see more results</p>
              <button onClick={clearFilters} className="reset-button">
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Properties;
