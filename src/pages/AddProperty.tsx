import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../services/propertyService';
import ImageUploader from '../components/ImageUploader';
import type { Property, PropertyType, Location, PropertyStatus } from '../types';
import '../styles/AddProperty.css';

const AddProperty = () => {
  const navigate = useNavigate();

  // Property form state
  const [formData, setFormData] = useState({
    title: '',
    type: 'Condominium' as PropertyType,
    location: 'Cebu' as Location,
    status: 'for-sale' as PropertyStatus,
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    features: '',
    featured: false,
  });

  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const [propertyId] = useState(`property_${Date.now()}`); // Generate unique ID for this session
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate that at least one image is uploaded
      if (propertyImages.length === 0) {
        setSubmitMessage('Please upload at least one property image.');
        setSubmitting(false);
        return;
      }

      // Parse features from comma-separated string
      const featuresArray = formData.features
        .split(',')
        .map(feature => feature.trim())
        .filter(feature => feature.length > 0);

      // Prepare property data
      const propertyData: Omit<Property, 'id'> = {
        title: formData.title,
        type: formData.type,
        location: formData.location,
        status: formData.status,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        description: formData.description,
        features: featuresArray,
        images: propertyImages, // Use Cloudinary images
        featured: formData.featured,
        isActive: true, // New properties are active by default
      };

      // Add property to Firebase
      const propertyId = await addProperty(propertyData);

      if (propertyId) {
        setSubmitMessage('Property added successfully!');
        // Reset form
        setFormData({
          title: '',
          type: 'Condominium',
          location: 'Cebu',
          status: 'for-sale',
          price: '',
          area: '',
          bedrooms: '',
          bathrooms: '',
          description: '',
          features: '',
          featured: false,
        });
        setPropertyImages([]);
        
        // Redirect to properties page after 2 seconds
        setTimeout(() => {
          navigate('/properties');
        }, 2000);
      } else {
        setSubmitMessage('Error adding property. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting property:', error);
      setSubmitMessage('Error adding property. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-property-container">
      <div className="add-property-card">
        <div className="page-header">
          <h1>Add New Property</h1>
          <button onClick={() => navigate('/dashboard')} className="back-to-dashboard-btn">
            ← Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Property Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Property Type*</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="Condominium">Condominium</option>
                <option value="House and Lot">House and Lot</option>
                <option value="Rental">Rental</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Property Status*</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="preselling">Preselling Projects</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location*</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="Cebu">Cebu</option>
                <option value="Bohol">Bohol</option>
                <option value="Palawan">Palawan</option>
                <option value="Davao">Davao</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (₱)*</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="area">Area (sqm)*</label>
              <input
                type="number"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="features">Features (comma-separated)*</label>
            <input
              type="text"
              id="features"
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              placeholder="e.g., Swimming Pool, Gym, Parking"
              required
            />
          </div>

          <div className="form-group">
            <label>Property Images*</label>
            <ImageUploader
              onImagesUploaded={(imageUrls) => setPropertyImages(imageUrls)}
              maxImages={15}
              existingImages={propertyImages}
              buttonText="Upload Property Images"
              propertyData={{
                id: propertyId,
                title: formData.title,
                type: formData.type,
                location: formData.location
              }}
            />
            <small className="form-hint">
              Upload high-quality images of the property. First image will be the primary display image.
            </small>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              <span>Mark as Featured Property</span>
            </label>
          </div>

          {submitMessage && (
            <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
              {submitMessage}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/properties')}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Adding Property...' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
