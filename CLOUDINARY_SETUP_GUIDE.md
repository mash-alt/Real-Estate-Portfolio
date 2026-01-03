# Cloudinary Integration Guide

This guide will walk you through setting up Cloudinary for your Real Estate Portfolio application.

## 📋 Table of Contents
1. [Create Cloudinary Account](#1-create-cloudinary-account)
2. [Configure Upload Preset](#2-configure-upload-preset)
3. [Set Environment Variables](#3-set-environment-variables)
4. [Test the Integration](#4-test-the-integration)
5. [How It Works](#5-how-it-works)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Create Cloudinary Account

### Step 1.1: Sign Up
1. Go to https://cloudinary.com/users/register/free
2. Fill in your details:
   - Email address
   - Name
   - Password
3. Click "Sign up"
4. Verify your email address

### Step 1.2: Get Your Credentials
1. Once logged in, you'll see your **Dashboard**
2. Find and note down these values (you'll need them later):
   - **Cloud Name** - e.g., `dxxxxxxxxxxxxx`
   - **API Key** - e.g., `123456789012345`
   - **API Secret** - Keep this secure!

---

## 2. Configure Upload Preset

Upload presets allow unsigned uploads from your frontend without exposing your API secret.

### Step 2.1: Create Upload Preset
1. In Cloudinary Dashboard, go to **Settings** (gear icon in top right)
2. Click on **Upload** tab in the left sidebar
3. Scroll down to **Upload presets** section
4. Click **Add upload preset**

### Step 2.2: Configure the Preset
Fill in the following settings:

**Basic Settings:**
- **Preset name**: `real_estate_unsigned` (or your preferred name)
- **Signing mode**: Select **Unsigned** ⚠️ Important!
- **Folder**: `real-estate-properties` (optional but recommended)
- **Use filename**: Yes (optional)
- **Unique filename**: Yes (recommended)

**Image Transformations (Optional but Recommended):**
- **Format**: Auto (jpg, png, webp - whatever is best)
- **Quality**: Auto
- **Max width**: 2000 pixels
- **Max height**: 2000 pixels

**Access Control:**
- **Resource type**: Image
- **Access mode**: Public (so images can be displayed on your site)

### Step 2.3: Save the Preset
1. Click **Save** at the bottom
2. Note down your **preset name** (e.g., `real_estate_unsigned`)

---

## 3. Set Environment Variables

### Step 3.1: Open .env File
Open the `.env` file in the root of your project.

### Step 3.2: Add Your Cloudinary Credentials
Replace the placeholder values with your actual credentials:

```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=real_estate_unsigned
```

**Example:**
```env
VITE_CLOUDINARY_CLOUD_NAME=dxxxxxxxxxxxxx
VITE_CLOUDINARY_UPLOAD_PRESET=real_estate_unsigned
```

### Step 3.3: Restart Development Server
After updating `.env`, restart your development server:

```bash
# Stop the current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

## 4. Test the Integration

### Step 4.1: Start the Application
```bash
npm run dev
```

### Step 4.2: Test Upload
1. Navigate to `/admin/add-property`
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. Click **"📸 Upload Property Images"**
4. The Cloudinary widget should open
5. Upload a test image:
   - Drag & drop
   - Browse files
   - Take a photo (if on mobile)
   - Or paste image URL

### Step 4.3: Verify Upload
- You should see the uploaded image in a preview grid
- Check your Cloudinary Dashboard:
  - Go to **Media Library**
  - Look for folder `real-estate-properties`
  - Your uploaded images should appear there

---

## 5. How It Works

### Architecture Overview

```
User → Upload Button → Cloudinary Widget → Cloudinary Server
                                                ↓
                                        Secure Image URL
                                                ↓
                                        Firebase Database
                                                ↓
                                        Display on Website
```

### Key Components

#### 1. **ImageUploader Component** (`src/components/ImageUploader.tsx`)
- Reusable upload component
- Shows image previews
- Handles multiple uploads
- Validates max image count

#### 2. **Cloudinary Service** (`src/services/cloudinaryService.ts`)
- Opens upload widget
- Handles upload callbacks
- Provides utility functions:
  - `openCloudinaryWidget()` - Opens upload dialog
  - `getOptimizedImageUrl()` - Get resized/optimized URLs
  - `extractPublicId()` - Extract ID from URL

#### 3. **Configuration** (`src/config/cloudinary.ts`)
- Stores Cloudinary credentials
- Validates configuration

### Image Flow

1. **Upload**: User clicks upload → Widget opens → Selects images
2. **Process**: Cloudinary automatically:
   - Optimizes images
   - Creates thumbnails
   - Converts to best format (WebP, etc.)
3. **Store**: Secure URLs saved to Firebase
4. **Display**: Images loaded from Cloudinary CDN (fast & global)

### Why Cloudinary?

✅ **Benefits:**
- ⚡ Fast global CDN
- 📸 Automatic image optimization
- 🖼️ On-the-fly transformations (resize, crop, quality)
- 💰 Free tier: 25GB storage, 25GB bandwidth/month
- 🔒 Secure uploads without exposing credentials
- 📱 Responsive images (different sizes for mobile/desktop)

---

## 6. Troubleshooting

### Issue: "Cloudinary widget not loaded"

**Solution:**
- Check internet connection
- Verify the Cloudinary script is in `index.html`:
  ```html
  <script src="https://upload-widget.cloudinary.com/global/all.js"></script>
  ```
- Clear browser cache and reload

### Issue: "Upload failed" or "Invalid credentials"

**Solution:**
1. Verify `.env` file has correct values
2. Check Upload Preset:
   - Is it set to **Unsigned**?
   - Is the name spelled correctly?
3. Restart development server after changing `.env`

### Issue: "Images not showing"

**Solution:**
1. Check browser console for errors
2. Verify image URLs start with `https://res.cloudinary.com/`
3. Check Cloudinary Media Library - are images there?
4. Ensure images are set to "Public" access

### Issue: Upload preset error

**Solution:**
1. Go to Cloudinary Settings → Upload tab
2. Find your preset
3. Ensure **Signing Mode** is **Unsigned**
4. Click Save

### Issue: CORS errors

**Solution:**
- Cloudinary handles CORS automatically for unsigned uploads
- If you see CORS errors, check:
  - Upload preset is unsigned
  - Using HTTPS (not HTTP)

---

## 🎯 Usage Examples

### Using in AddProperty Page (Already Integrated)

```tsx
<ImageUploader
  onImagesUploaded={(imageUrls) => setPropertyImages(imageUrls)}
  maxImages={10}
  existingImages={propertyImages}
  buttonText="Upload Property Images"
/>
```

### Getting Optimized Images

```typescript
import { getOptimizedImageUrl } from '../services/cloudinaryService';

// Get thumbnail (300x200)
const thumbnail = getOptimizedImageUrl(publicId, 300, 200);

// Get full size (auto quality)
const fullImage = getOptimizedImageUrl(publicId, 1200, 800);
```

### Programmatic Upload from URL

```typescript
import { uploadImageFromUrl } from '../services/cloudinaryService';

const result = await uploadImageFromUrl('https://example.com/image.jpg');
if (result) {
  console.log('Uploaded:', result.secureUrl);
}
```

---

## 🚀 Next Steps

Now that Cloudinary is integrated, you can:

1. ✅ **Test uploading** - Add a new property with images
2. 🎨 **Customize widget** - Edit `cloudinaryService.ts` to change:
   - Upload folder
   - Max file size
   - Cropping settings
   - Widget colors/theme
3. 📱 **Optimize images** - Use `getOptimizedImageUrl()` in PropertyCard component
4. 🔄 **Add update functionality** - Create an EditProperty page

---

## 📚 Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload Widget Docs](https://cloudinary.com/documentation/upload_widget)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
- [Free Plan Limits](https://cloudinary.com/pricing)

---

## 💡 Pro Tips

1. **Image Optimization**: Cloudinary automatically serves WebP on supported browsers
2. **Lazy Loading**: Consider adding lazy loading for property images
3. **Responsive Images**: Use different sizes for mobile/desktop
4. **SEO**: Images are automatically indexed by search engines
5. **Backup**: Cloudinary stores your images securely with redundancy

---

## Need Help?

If you encounter issues:
1. Check this guide's Troubleshooting section
2. Review browser console errors
3. Check Cloudinary Dashboard logs
4. Ensure all environment variables are set correctly

Happy uploading! 🎉
