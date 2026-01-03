import { cloudinaryConfig } from '../config/cloudinary';

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  secureUrl: string;
  format: string;
  width: number;
  height: number;
}

// Declare Cloudinary widget type
declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: any,
        callback: (error: any, result: any) => void
      ) => {
        open: () => void;
        close: () => void;
        destroy: () => void;
      };
    };
  }
}

/**
 * Opens Cloudinary upload widget with property-specific organization
 * @param onSuccess Callback function when images are uploaded successfully
 * @param onError Callback function when upload fails
 * @param maxFiles Maximum number of files to upload (default: 10)
 * @param propertyId Unique property ID for folder organization
 * @param propertyData Property metadata for tagging and context
 */
export const openCloudinaryWidget = (
  onSuccess: (results: CloudinaryUploadResult[]) => void,
  onError?: (error: string) => void,
  maxFiles: number = 10,
  propertyId?: string,
  propertyData?: {
    title?: string;
    type?: string;
    location?: string;
  }
) => {
  if (!window.cloudinary) {
    const errorMsg = 'Cloudinary widget not loaded. Please check your internet connection.';
    console.error(errorMsg);
    onError?.(errorMsg);
    return;
  }

  const uploadedImages: CloudinaryUploadResult[] = [];
  
  // Generate unique property ID if not provided
  const propId = propertyId || `property_${Date.now()}`;
  
  // Build tags for easy filtering
  const tags = [
    `property_${propId}`,
    propertyData?.type?.toLowerCase().replace(/\s+/g, '_'),
    propertyData?.location?.toLowerCase().replace(/\s+/g, '_'),
    'real_estate'
  ].filter(Boolean);

  // Build context for metadata
  const context = {
    property_id: propId,
    property_title: propertyData?.title || 'Untitled Property',
    property_location: propertyData?.location || 'Unknown',
    upload_date: new Date().toISOString()
  };

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudinaryConfig.cloudName,
      uploadPreset: cloudinaryConfig.uploadPreset,
      sources: ['local', 'url', 'camera'],
      multiple: true,
      maxFiles: maxFiles,
      clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
      maxImageFileSize: 5000000, // 5MB
      maxImageWidth: 2000,
      maxImageHeight: 2000,
      cropping: false, // Disable cropping requirement
      showSkipCropButton: true, // Allow users to skip if they want to crop
      
      // ORGANIZATION: Folder structure by property ID
      folder: `real-estate/properties/${propId}`,
      
      // TAGGING: For easy search and filtering
      tags: tags,
      
      // CONTEXT: Additional metadata
      context: context,
      
      resourceType: 'image',
      thumbnails: '.cloudinary-thumbnails',
      showUploadMoreButton: true,
      styles: {
        palette: {
          window: '#FFFFFF',
          windowBorder: '#90A0B3',
          tabIcon: '#667eea',
          menuIcons: '#5A616A',
          textDark: '#000000',
          textLight: '#FFFFFF',
          link: '#667eea',
          action: '#667eea',
          inactiveTabIcon: '#B3B3B3',
          error: '#F44235',
          inProgress: '#667eea',
          complete: '#20B832',
          sourceBg: '#F4F4F5'
        },
        fonts: {
          default: null,
          "'Poppins', sans-serif": {
            url: 'https://fonts.googleapis.com/css?family=Poppins',
            active: true
          }
        }
      }
    },
    (error: any, result: any) => {
      if (error) {
        console.error('Upload error:', error);
        onError?.(error.message || 'Upload failed');
        return;
      }

      if (result.event === 'success') {
        const uploadResult: CloudinaryUploadResult = {
          url: result.info.url,
          secureUrl: result.info.secure_url,
          publicId: result.info.public_id,
          format: result.info.format,
          width: result.info.width,
          height: result.info.height,
        };
        uploadedImages.push(uploadResult);
        
        // Log organization details
        console.log(`✅ Image uploaded to: real-estate/properties/${propId}`);
        console.log(`🏷️ Tags:`, tags);
      }

      if (result.event === 'close') {
        if (uploadedImages.length > 0) {
          console.log(`✅ Successfully uploaded ${uploadedImages.length} images for property: ${propId}`);
          onSuccess(uploadedImages);
        }
        widget.destroy();
      }
    }
  );

  widget.open();
};

/**
 * Upload a single image from a URL
 * @param imageUrl URL of the image to upload
 * @returns Promise with the upload result
 */
export const uploadImageFromUrl = async (
  imageUrl: string
): Promise<CloudinaryUploadResult | null> => {
  try {
    const formData = new FormData();
    formData.append('file', imageUrl);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    formData.append('folder', 'real-estate-properties');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return {
      url: data.url,
      secureUrl: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

/**
 * Get optimized image URL with transformations
 * @param publicId Cloudinary public ID of the image
 * @param width Desired width
 * @param height Desired height
 * @param quality Quality (default: auto)
 */
export const getOptimizedImageUrl = (
  publicId: string,
  width?: number,
  height?: number,
  quality: string = 'auto'
): string => {
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push('f_auto'); // Auto format
  transformations.push('c_fill'); // Crop mode
  
  const transformString = transformations.join(',');
  
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformString}/${publicId}`;
};

/**
 * Delete an image from Cloudinary (requires backend implementation for security)
 * Note: Direct deletion from frontend is not recommended due to security concerns
 * This is a placeholder that should be implemented via your backend API
 */
export const deleteImage = async (publicId: string): Promise<boolean> => {
  console.warn(
    'Image deletion should be implemented via backend API for security. Public ID:',
    publicId
  );
  // TODO: Implement backend endpoint for image deletion
  return false;
};

/**
 * Extract public ID from Cloudinary URL
 * @param url Cloudinary image URL
 */
export const extractPublicId = (url: string): string | null => {
  try {
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};
