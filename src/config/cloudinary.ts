// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
};

// Validate configuration
export const isCloudinaryConfigured = (): boolean => {
  return !!(cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset);
};
