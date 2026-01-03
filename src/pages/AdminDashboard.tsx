import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProperties, deleteProperty } from '../services/propertyService';
import type { Property } from '../types';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');

  // Check for existing session and rate limit on mount
  useEffect(() => {
    const checkSession = () => {
      const sessionData = localStorage.getItem('adminSession');
      if (sessionData) {
        try {
          const { expiry } = JSON.parse(sessionData);
          if (Date.now() < expiry) {
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('adminSession');
          }
        } catch (error) {
          localStorage.removeItem('adminSession');
        }
      }
      
      // Check rate limiting
      const blockUntil = localStorage.getItem('blockUntil');
      if (blockUntil) {
        const blockTime = parseInt(blockUntil);
        if (Date.now() < blockTime) {
          setIsBlocked(true);
          const attempts = localStorage.getItem('loginAttempts');
          setLoginAttempts(parseInt(attempts || '0'));
        } else {
          // Unblock and reset
          localStorage.removeItem('blockUntil');
          localStorage.removeItem('loginAttempts');
          setIsBlocked(false);
          setLoginAttempts(0);
        }
      } else {
        const attempts = localStorage.getItem('loginAttempts');
        if (attempts) {
          setLoginAttempts(parseInt(attempts));
        }
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProperties();
    }
  }, [isLoggedIn]);

  const fetchProperties = async () => {
    setLoading(true);
    const data = await getAllProperties();
    setProperties(data);
    setLoading(false);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Check if blocked due to too many attempts
    if (isBlocked) {
      setLoginError('Too many failed attempts. Please try again in 15 minutes.');
      return;
    }

    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginAttempts(0);
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('blockUntil');
      // Save session for 1 hour
      const sessionData = {
        expiry: Date.now() + (60 * 60 * 1000) // 1 hour
      };
      localStorage.setItem('adminSession', JSON.stringify(sessionData));
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts.toString());
      
      if (newAttempts >= 5) {
        const blockUntil = Date.now() + (15 * 60 * 1000); // Block for 15 minutes
        localStorage.setItem('blockUntil', blockUntil.toString());
        setIsBlocked(true);
        setLoginError('Too many failed attempts. Please try again in 15 minutes.');
      } else {
        setLoginError(`Invalid username or password. ${5 - newAttempts} attempts remaining.`);
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('adminSession');
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const success = await deleteProperty(id);
    
    if (success) {
      setProperties(properties.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } else {
      alert('Failed to delete property. Please try again.');
    }
    setDeleting(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesLocation = filterLocation === 'all' || property.location === filterLocation;
    
    return matchesSearch && matchesType && matchesLocation;
  });

  // Statistics
  const stats = {
    total: properties.length,
    condos: properties.filter(p => p.type === 'Condominium').length,
    houses: properties.filter(p => p.type === 'House and Lot').length,
    rentals: properties.filter(p => p.type === 'Rental').length,
    featured: properties.filter(p => p.featured).length,
  };

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="admin-dashboard">
        <div className="admin-login-container">
          <div className="admin-login-card">
            <div className="login-header">
              <h1>🔐 Admin Dashboard</h1>
              <p>Please login to access the admin panel</p>
            </div>
            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              {loginError && <div className="error-message">{loginError}</div>}
              <button type="submit" className="login-button">
                Login to Dashboard
              </button>
            </form>
            <div className="login-footer">
              <button onClick={() => navigate('/')} className="back-home-btn">
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>🏠 Admin Dashboard</h1>
          <p>Manage your real estate properties</p>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate('/')} className="view-site-btn">
            🌐 View Site
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Properties</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <div className="stat-value">{stats.condos}</div>
            <div className="stat-label">Condominiums</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏡</div>
          <div className="stat-content">
            <div className="stat-value">{stats.houses}</div>
            <div className="stat-label">House & Lots</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-content">
            <div className="stat-value">{stats.rentals}</div>
            <div className="stat-label">Rentals</div>
          </div>
        </div>
        <div className="stat-card featured">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{stats.featured}</div>
            <div className="stat-label">Featured</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button 
          onClick={() => navigate('/dashboard/add-property')} 
          className="add-property-btn"
        >
          ➕ Add New Property
        </button>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="Condominium">Condominium</option>
            <option value="House and Lot">House and Lot</option>
            <option value="Rental">Rental</option>
          </select>
          <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
            <option value="all">All Locations</option>
            <option value="Cebu">Cebu</option>
            <option value="Bohol">Bohol</option>
            <option value="Palawan">Palawan</option>
            <option value="Davao">Davao</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="properties-section">
        <div className="section-header">
          <h2>Properties ({filteredProperties.length})</h2>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No properties found</h3>
            <p>Try adjusting your filters or add a new property</p>
            <button onClick={() => navigate('/admin/add-property')} className="add-first-btn">
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="properties-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Area</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property.id}>
                    <td className="image-cell">
                      <img 
                        src={property.images[0] || '/placeholder.jpg'} 
                        alt={property.title}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/100x75?text=No+Image';
                        }}
                      />
                    </td>
                    <td className="title-cell">
                      <div className="title-content">
                        <span className="property-title">{property.title}</span>
                        {property.featured && <span className="featured-badge">⭐ Featured</span>}
                      </div>
                    </td>
                    <td>{property.type}</td>
                    <td>📍 {property.location}</td>
                    <td className="price-cell">{formatPrice(property.price)}</td>
                    <td>{property.area} sqm</td>
                    <td>
                      <span className="status-badge active">Active</span>
                    </td>
                    <td className="actions-cell">
                      <button
                        onClick={() => navigate(`/properties/${property.id}`)}
                        className="action-btn view-btn"
                        title="View Property"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => navigate(`/edit-property/${property.id}`)}
                        className="action-btn edit-btn"
                        title="Edit Property"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(property.id)}
                        className="action-btn delete-btn"
                        title="Delete Property"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>⚠️ Delete Property</h2>
            <p>Are you sure you want to delete this property?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                onClick={() => setDeleteConfirm(null)} 
                className="cancel-btn"
                disabled={deleting}
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deleteConfirm)} 
                className="confirm-delete-btn"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
