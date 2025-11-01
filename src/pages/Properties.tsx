import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { properties as allProperties } from '../data/mockData';
import type { PropertyType, Location } from '../types';
import '../styles/Properties.css';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [selectedType, setSelectedType] = useState<PropertyType | ''>('');
  const [selectedLocation, setSelectedLocation] = useState<Location | ''>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const propertyTypes: PropertyType[] = ['Condominium', 'House and Lot', 'Lot-only', 'Office Space'];
  const locations: Location[] = ['Cebu', 'Manila', 'Palawan', 'Boracay', 'Davao', 'Baguio', 'Iloilo'];

  useEffect(() => {
    const typeParam = searchParams.get('type') as PropertyType | null;
    const locationParam = searchParams.get('location') as Location | null;
    
    if (typeParam) setSelectedType(typeParam);
    if (locationParam) setSelectedLocation(locationParam);
  }, [searchParams]);

  useEffect(() => {
    let filtered = allProperties;

    if (selectedType) {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    if (selectedLocation) {
      filtered = filtered.filter(p => p.location === selectedLocation);
    }

    setFilteredProperties(filtered);
  }, [selectedType, selectedLocation]);

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
