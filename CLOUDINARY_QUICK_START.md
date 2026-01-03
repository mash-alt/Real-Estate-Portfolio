# 🚀 Quick Start: Cloudinary Setup

## Step 1: Create Account (5 minutes)
1. Go to: https://cloudinary.com/users/register/free
2. Sign up with your email
3. Verify your email

## Step 2: Get Credentials (2 minutes)
From your Cloudinary Dashboard, copy:
- ☁️ **Cloud Name**
- 🔑 **API Key** (optional for this setup)

## Step 3: Create Upload Preset (3 minutes)
1. Settings → Upload tab
2. Click "Add upload preset"
3. Fill in:
   - Name: `real_estate_unsigned`
   - ⚠️ **Signing mode: Unsigned** (CRITICAL!)
   - Folder: `real-estate-properties`
4. Save

## Step 4: Update .env File (1 minute)
Open `.env` and update:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=real_estate_unsigned
```

## Step 5: Restart Server (1 minute)
```bash
# Stop server (Ctrl+C)
npm run dev
```

## Step 6: Test (2 minutes)
1. Go to: http://localhost:5173/admin/add-property
2. Login: admin / admin123
3. Click "📸 Upload Property Images"
4. Upload a test image

## ✅ Done!
Total time: ~15 minutes

---

## 🆘 Quick Troubleshooting

### Widget not opening?
- Check `.env` file is saved
- Restart dev server
- Check browser console

### Upload fails?
- Preset must be **Unsigned**
- Check cloud name spelling
- Check preset name spelling

### Images not showing?
- Check Cloudinary Media Library
- Verify URLs in Firebase

---

## 📝 What You Created

| File | Purpose |
|------|---------|
| `src/config/cloudinary.ts` | Configuration |
| `src/services/cloudinaryService.ts` | Upload logic |
| `src/components/ImageUploader.tsx` | Upload UI component |
| `src/pages/AddProperty.tsx` | Updated to use Cloudinary |
| `.env` | Credentials (keep secret!) |

---

## 🎯 Usage

### In any form/page:
```tsx
import ImageUploader from '../components/ImageUploader';

<ImageUploader
  onImagesUploaded={(urls) => setImages(urls)}
  maxImages={10}
/>
```

### Get optimized images:
```tsx
import { getOptimizedImageUrl } from '../services/cloudinaryService';

const thumb = getOptimizedImageUrl(publicId, 300, 200);
```

---

Need detailed help? See: `CLOUDINARY_SETUP_GUIDE.md`
