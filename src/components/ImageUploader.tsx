import { useState } from 'react';
import { openCloudinaryWidget, type CloudinaryUploadResult } from '../services/cloudinaryService';
import '../styles/ImageUploader.css';

interface ImageUploaderProps {
  onImagesUploaded: (imageUrls: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
  buttonText?: string;
  propertyData?: {
    id?: string;
    title?: string;
    type?: string;
    location?: string;
  };
}

const ImageUploader = ({
  onImagesUploaded,
  maxImages = 15,
  existingImages = [],
  buttonText = 'Upload Images',
  propertyData,
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>(existingImages);

  const handleUpload = () => {
    setUploading(true);
    setError('');

    openCloudinaryWidget(
      (results: CloudinaryUploadResult[]) => {
        const imageUrls = results.map(result => result.secureUrl);
        const allImages = [...uploadedImages, ...imageUrls];
        setUploadedImages(allImages);
        onImagesUploaded(allImages);
        setUploading(false);
      },
      (errorMsg: string) => {
        setError(errorMsg);
        setUploading(false);
      },
      maxImages - uploadedImages.length,
      propertyData?.id,
      {
        title: propertyData?.title,
        type: propertyData?.type,
        location: propertyData?.location
      }
    );
  };

  const handleRemoveImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onImagesUploaded(newImages);
  };

  return (
    <div className="image-uploader">
      <div className="upload-header">
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading || uploadedImages.length >= maxImages}
          className="upload-button"
        >
          {uploading ? (
            <>
              <span className="spinner"></span>
              Uploading...
            </>
          ) : (
            <>
              📸 {buttonText}
            </>
          )}
        </button>
        <span className="image-count">
          {uploadedImages.length} / {maxImages} images
        </span>
      </div>

      {error && (
        <div className="upload-error">
          ⚠️ {error}
        </div>
      )}

      {uploadedImages.length > 0 && (
        <div className="uploaded-images-grid">
          {uploadedImages.map((imageUrl, index) => (
            <div key={index} className="uploaded-image-item">
              <img src={imageUrl} alt={`Upload ${index + 1}`} />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="remove-image-btn"
                aria-label="Remove image"
              >
                ✕
              </button>
              {index === 0 && (
                <span className="primary-badge">Primary</span>
              )}
            </div>
          ))}
        </div>
      )}

      {uploadedImages.length === 0 && (
        <div className="upload-placeholder">
          <div className="placeholder-icon">🖼️</div>
          <p>No images uploaded yet</p>
          <p className="placeholder-hint">Click the button above to upload property images</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
