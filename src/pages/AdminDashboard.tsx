import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import { getAllProperties, deleteProperty, updateProperty } from '../services/propertyService';
import type { Property } from '../types';
import { 
  Lock, Home, BarChart3, Building2, Building, Key, Star, 
  Plus, Search, Globe, LogOut, Eye, Edit, Trash2, AlertTriangle,
  ArrowLeft, Loader2, Inbox, MapPin, Power, Settings
} from 'lucide-react';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [filterFeatured, setFilterFeatured] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Check for existing Firebase Auth session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    
    return () => unsubscribe();
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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    try {
      // Convert 'admin' username to email format for Firebase Auth
      const loginEmail = email.includes('@') ? email : 'kyleenzocatarig@gmail.com';
      await signInWithEmailAndPassword(auth, loginEmail, password);
      // onAuthStateChanged will handle setting isLoggedIn to true
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setLoginError('Invalid email or password.');
      } else if (error.code === 'auth/too-many-requests') {
        setLoginError('Too many failed attempts. Please try again later.');
      } else if (error.code === 'auth/invalid-credential') {
        setLoginError('Invalid credentials. Please check your email and password.');
      } else {
        setLoginError('Login failed. Please try again.');
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEmail('');
      setPassword('');
      // onAuthStateChanged will handle setting isLoggedIn to false
    } catch (error) {
      console.error('Logout error:', error);
    }
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

  const handleToggleStatus = async (id: string, currentStatus: boolean | undefined) => {
    setToggling(id);
    const newStatus = !currentStatus;
    const success = await updateProperty(id, { isActive: newStatus });
    
    if (success) {
      setProperties(properties.map(p => 
        p.id === id ? { ...p, isActive: newStatus } : p
      ));
    } else {
      alert('Failed to update property status. Please try again.');
    }
    setToggling(null);
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
    const matchesFeatured = filterFeatured === 'all' || 
                           (filterFeatured === 'featured' && property.featured) ||
                           (filterFeatured === 'not-featured' && !property.featured);
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    
    return matchesSearch && matchesType && matchesLocation && matchesFeatured && matchesStatus;
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
              <div className="login-icon">
                <Lock size={48} strokeWidth={2} />
              </div>
              <h1>Admin Dashboard</h1>
              <p>Please login to access the admin panel</p>
            </div>
            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="email">Email or Username</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin username or email"
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
              <button type="submit" className="login-button" disabled={loggingIn}>
                {loggingIn ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    Logging in...
                  </>
                ) : (
                  'Login to Dashboard'
                )}
              </button>
            </form>
            <div className="login-footer">
              <button onClick={() => navigate('/')} className="back-home-btn">
                <ArrowLeft size={16} />
                Back to Home
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
          <h1>
            <Home size={32} strokeWidth={2} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Admin Dashboard
          </h1>
          <p>Manage your real estate properties</p>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate('/')} className="view-site-btn">
            <Globe size={18} />
            View Site
          </button>
          <button 
            onClick={() => navigate('/dashboard/settings')} 
            className="settings-btn"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart3 size={36} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Properties</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Building2 size={36} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.condos}</div>
            <div className="stat-label">Condominiums</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Building size={36} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.houses}</div>
            <div className="stat-label">House & Lots</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Key size={36} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.rentals}</div>
            <div className="stat-label">Rentals</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button 
          onClick={() => navigate('/dashboard/add-property')} 
          className="add-property-btn"
        >
          <Plus size={20} strokeWidth={2.5} />
          Add New Property
        </button>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search properties..."
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
          <select value={filterFeatured} onChange={(e) => setFilterFeatured(e.target.value)}>
            <option value="all">All Properties</option>
            <option value="featured">Featured Only</option>
            <option value="not-featured">Non-Featured</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="preselling">Preselling</option>
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
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
            <Loader2 size={48} className="spin" />
            <p>Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="empty-state">
            <Inbox size={64} strokeWidth={1.5} className="empty-icon" />
            <h3>No properties found</h3>
            <p>Try adjusting your filters or add a new property</p>
            <button onClick={() => navigate('/dashboard/add-property')} className="add-first-btn">
              <Plus size={18} />
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
                        {property.featured && (
                          <span className="featured-badge">
                            <Star size={12} fill="currentColor" />
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td>{property.type}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <MapPin size={16} />
                        {property.location}
                      </span>
                    </td>
                    <td className="price-cell">{formatPrice(property.price)}</td>
                    <td>{property.area} sqm</td>
                    <td>
                      <span className={`status-badge ${property.isActive !== false ? 'active' : 'sold'}`}>
                        {property.isActive !== false ? 'Active' : 'Sold'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        onClick={() => navigate(`/properties/${property.id}`)}
                        className="action-btn view-btn"
                        title="View Property"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/edit-property/${property.id}`)}
                        className="action-btn edit-btn"
                        title="Edit Property"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(property.id, property.isActive)}
                        className={`action-btn ${property.isActive !== false ? 'deactivate-btn' : 'activate-btn'}`}
                        title={property.isActive !== false ? 'Mark as Sold' : 'Mark as Active'}
                        disabled={toggling === property.id}
                      >
                        {toggling === property.id ? (
                          <Loader2 size={18} className="spin" />
                        ) : (
                          <Power size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(property.id)}
                        className="action-btn delete-btn"
                        title="Delete Property"
                      >
                        <Trash2 size={18} />
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <AlertTriangle size={32} strokeWidth={2} style={{ color: '#dc2626' }} />
              <h2 style={{ margin: 0 }}>Delete Property</h2>
            </div>
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
                {deleting ? (
                  <>
                    <Loader2 size={16} className="spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
