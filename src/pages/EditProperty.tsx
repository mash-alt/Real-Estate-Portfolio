import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPropertyById, updateProperty } from '../services/propertyService';
import ImageUploader from '../components/ImageUploader';
import type { Property, PropertyType, Location } from '../types';
import '../styles/AddProperty.css';

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Condominium' as PropertyType,
    location: 'Cebu' as Location,
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    features: '',
    featured: false,
  });

  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      const property = await getPropertyById(id);
      if (property) {
        setFormData({
          title: property.title,
          type: property.type,
          location: property.location,
          price: property.price.toString(),
          area: property.area.toString(),
          bedrooms: property.bedrooms?.toString() || '',
          bathrooms: property.bathrooms?.toString() || '',
          description: property.description,
          features: property.features.join(', '),
          featured: property.featured || false,
        });
        setPropertyImages(property.images);
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSubmitting(true);
    setSubmitMessage('');

    try {
      if (propertyImages.length === 0) {
        setSubmitMessage('Please upload at least one property image.');
        setSubmitting(false);
        return;
      }

      const featuresArray = formData.features
        .split(',')
        .map(feature => feature.trim())
        .filter(feature => feature.length > 0);

      const propertyData: Partial<Property> = {
        title: formData.title,
        type: formData.type,
        location: formData.location,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        description: formData.description,
        features: featuresArray,
        images: propertyImages,
        featured: formData.featured,
      };

      const success = await updateProperty(id, propertyData);

      if (success) {
        setSubmitMessage('Property updated successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setSubmitMessage('Error updating property. Please try again.');
      }
    } catch (error) {
      console.error('Error updating property:', error);
      setSubmitMessage('Error updating property. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="add-property-container">
        <div className="add-property-card">
          <p>Loading property...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-property-container">
      <div className="add-property-card">
        <div className="page-header">
          <h1>Edit Property</h1>
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
              buttonText="Upload/Replace Images"
              propertyData={{
                id: id,
                title: formData.title,
                type: formData.type,
                location: formData.location
              }}
            />
            <small className="form-hint">
              You can add more images or remove existing ones. First image will be the primary display image.
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
              onClick={() => navigate(`/properties/${id}`)}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Updating Property...' : 'Update Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
