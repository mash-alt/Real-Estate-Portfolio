# Admin Panel Guide

## 🎉 Complete Admin Dashboard with CRUD Features

Your real estate portfolio now has a comprehensive **Admin Dashboard** at `/admin` with full **Create, Read, Update, Delete (CRUD)** functionality and Cloudinary image management!

---

## 🚀 Quick Access

### Admin Dashboard
Navigate to: **http://localhost:5174/admin**

This is your central hub for all admin operations!

---

## 🔐 Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

> ⚠️ **Security Note:** Change these credentials in production!

---

## ✨ Features Overview

### 🏠 **Admin Dashboard** (`/admin`) - NEW!
- **Statistics Overview:** View total properties, condos, houses, rentals, and featured listings
- **Property Management Table:** See all properties at a glance with thumbnails
- **Quick Actions:** One-click access to add new properties
- **Search & Filter:** Find properties by title, type, or location
- **Inline Actions:** View, Edit, or Delete any property directly from the table
- **Responsive Design:** Works perfectly on desktop and mobile

### 1. **Create Properties** ✅
- Navigate to: `/admin/add-property`
- Upload property images using Cloudinary
- Images are automatically organized in folders
- Supports up to 10 images per property
- First image becomes the primary display image

### 2. **Update Properties** ✅
- From any property detail page, click **Admin** → **Edit**
- Update all property details
- Add new images or remove existing ones
- Images stored in Cloudinary with proper metadata
- Changes save to Firebase

### 3. **Delete Properties** ✅
- Froccessing the Admin Dashboard (Recommended)

1. **Navigate to Admin Dashboard:**
   ```
   http://localhost:5174/admin
   ```

2. **Login with admin credentials:**
   - Username: `admin`
   - Password: `admin123`

3. **Dashboard Features:**
   - **Statistics Cards:** See property counts by type
   - **Search Bar:** Find properties by name or location
   - **Filters:** Filter by type (Condominium, House and Lot, Rental) and location
   - **Properties Table:** View all properties with:
     - Property thumbnail
     - Title and featured badge
     - Type, location, and area
     - Price
     - Quick action buttons (View 👁️, Edit ✏️, Delete 🗑️)

4. **Quick Actions:**
   - **➕ Add New Property** - Navigate to add property form
   - **View Site** - Return to public website
   - **Logout** - Exit admin mode

### Am any property detail page, click **Admin** → **Delete**
- Confirmation modal prevents accidental deletions
- Removes property from Firebase database

---

## 📖 How to Use

### Adding a New Property

1. **Navigate to Add Property page:**
   ```
   http://localhost:5174/admin/add-property
   ```
**Option 1: From Admin Dashboard (Easiest)**

1. Go to `/admin`
2. Find the property in the table
3. Click the **✏️ Edit** button
**Option 2: From Property Detail Page**

1. **Navigate to any property detail page:**
   ```
   http://localhost:5174/properties/{property-id}
   ```

2. **Click "🔐 Admin" button** in the top right

3. **Login with admin credentials**

4. **Click "✏️ Edit" button**

5. **Update any fields or images**

6. **Click "Update Property"**

### Deleting a Property

**Option 1: From Admin Dashboard (Easiest)**

1. Go to `/admin`
2. Find the property in the table
3. Click the **🗑️ Delete** button
4. Confirm deletion in modal

**Option 2: From Property Detail Page**
   - Area
   - Bedrooms & Bathrooms (optional)
   - Description
   - Features (comma-separated)

4. **Upload Images:**
   - Click "Upload Property Images"
   - Cloudinary widget opens
   - Select multiple images (up to 10)
   - Images are automatically cropped to 3:2 ratio
   - Max file size: 5MB per image
   - Supported formats: JPG, PNG, GIF, WEBP

5. **Mark as Featured** (optional)

6. **Click "Add Property"**

### Editing a Property

1. **Navigate to any property detail page:**
   ```
   http://localhost:5174/properties/{property-id}
   ```

2. **Click "🔐 Admin" button** in the top right

3. **Login with admin credentials**

4. **Click "✏️ Edit" button**

5. **Update any fields or images**

6. **Click "Update Property"**

### Deleting a Property

1. **Navigate to any property detail page**

2. **Click "🔐 Admin" button**

3. **Login with admin credentials**

4. **Click "🗑️ Delete" button**

5. **Confirm deletion** in the modal

---

## 🖼️ Image Management with Cloudinary

### Automatic Organization

All property images are organized in Cloudinary with:

- **Primary Access (Recommended)

- **Admin Dashboard:** `http://localhost:5174/admin` ⭐
  - Central hub for all admin operations
  - View, search, filter, and manage all properties
  - Statistics overview
  - Quick access to all features

### Folder Structure:** `real-estate/properties/{property-id}/`
- **Tags:** property type, location, property ID
- **Metadata:** title, location, upload date

### Image Features

- ✅ Automatic cropping to 3:2 aspect ratio
- ✅ Maximum 5MB per image
- ✅ Maximum resolution: 2000x2000px
- ✅ Supports drag & drop
- ✅ Camera upload on mobile devices
- ✅ URL import support

### RemoviminDashboard.tsx       ✅ NEW! Central admin hub
│   ├── AddProperty.tsx          ✅ Create new properties
│   ├── EditProperty.tsx         ✅ Update existing properties
│   └── PropertyDetail.tsx       ✅ View + Admin controls (Delete)
├── components/
│   └── ImageUploader.tsx        ✅ Cloudinary integration
├── services/
│   ├── propertyService.ts       ✅ Firebase CRUD operations
│   └── cloudinaryService.ts     ✅ Image upload service
├── scripts/
│   └── removePropertyImages.ts  ✅ Batch remove images from Firebase
└── styles/
    ├── AdminDashboard.css       ✅ NEW! Dashboard styling
### Direct URLs

- **Add Property:** `http://localhost:5174/admin/add-property`
- **Edit Property:** `http://localhost:5174/edit-property/{property-id}`
- **View All Properties:** `http://localhost:5174/properties`

### From Website

1. Browse to any property detail page
2. Click the **🔐 Admin** button (top right)
3. Login to access Edit/Delete controls

---

## Admin Dashboard Layout

```
┌──────────────────────────────────────────────────────────┐
│  🏠 Admin Dashboard              [🌐 View Site] [Logout] │
│  Manage your real estate properties                      │
├──────────────────────────────────────────────────────────┤
│  [📊 Total: 14] [🏢 Condos: 8] [🏡 Houses: 4] [🏠 Rentals: 2] [⭐ Featured: 3] │
├──────────────────────────────────────────────────────────┤
│  [➕ Add New Property]                                   │
├──────────────────────────────────────────────────────────┤
│  🔍 Search...  [All Types ▼] [All Locations ▼]         │
├──────────────────────────────────────────────────────────┤
│  Properties (14)                                         │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Img │ Title │ Type │ Location │ Price │ Actions  │ │
│  ├─────┼───────┼──────┼──────────┼───────┼──────────┤ │
│  │ 📷  │ Prop  │ Condo│ Cebu     │ ₱2.5M │ 👁️✏️🗑️  │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### 📂 File Structure

### Key Files Modified/Created

```
src/
├── pages/
│   ├── AddProperty.tsx          ✅ Create new properties
│   ├── EditProperty.tsx         ✅ Update existing properties
│   └── PropertyDetail.tsx       ✅ View + Admin controls (Delete)
├── components/
│   └── ImageUploader.tsx        ✅ Cloudinary integration
├── services/
│   ├── propertyService.ts       ✅ Firebase CRUD operations
│   └── cloudinaryService.ts     ✅ Image upload service
├── scripts/
│   └── removePropertyImages.ts  ✅ Batch remove images from Firebase
└── styles/
    ├── AddProperty.css
    └── PropertyDetail.css       ✅ Admin controls styling
```

---

## 🎨 Admin UI Components

### PropertyDetail Page Admin Controls

```tsx
// Top bar with admin access
┌─────────────────────────────────────────────────┐
│ ← Back to Properties        [🔐 Admin] Button  │
└─────────────────────────────────────────────────┘

// After login - Admin mode
┌─────────────────────────────────────────────────────────┐
│ ← Back  [Admin Mode] [✏️ Edit] [🗑️ Delete] [Logout]  │
└─────────────────────────────────────────────────────────┘
```

### Login Modal

```
┌───────────────────────────┐
│     Admin Login           │
├───────────────────────────┤
│ Username: [________]      │
│ Password: [________]      │
│                           │
│    [Cancel]  [Login]      │
└───────────────────────────┘
```

### Delete Confirmation

```
┌───────────────────────────────────┐
│  ⚠️ Delete Property               │
├───────────────────────────────────┤
│  Are you sure you want to delete  │
│  Property Name?                   │
│                                   │
│  This action cannot be undone.    │
│                                   │
│    [Cancel]  [Yes, Delete]        │
└───────────────────────────────────┘
```

---

## 🔧 Technical Details

### Firebase Integration

- **Collection:** `listings`
- **Operations:** Create, Read, Update, Delete
- **Real-time updates:** ✅
- **Image URLs stored in Firebase:** ✅

### Cloudinary Configuration

```typescript
// Located in: src/config/cloudinary.ts
{
  cloudName: 'YOUR_CLOUD_NAME',
  uploadPreset: 'YOUR_UPLOAD_PRESET'
}
```

### Environment Variables

Make sure these are set in your `.env` file:

```env
# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## 📊 Database Management Scripts

### Remove All Property Images

If you need to clear all images from Firebase (e.g., during migration):

```bash
npm run remove:images
```

This script:
- Fetches all properties from Firebase
- Sets `images` array to empty `[]`
- Shows progress for each property

---

## 🎯 Best Practices

### Adding Properties

1. **Use high-quality images** (recommended: 1920x1280 or 3:2 ratio)
2. **First image is most important** - it appears in listings
3. **Write detailed descriptions** for better SEO
4. **Add relevant features** that buyers care about
5. **Mark featured properties** sparingly (special listings only)

### Managing Images

1. Upload all images at once for faster processing
2. Use the cropping tool to highlight key areas
3. Remove blurry or duplicate images
4. Keep image count between 5-10 per property

### Security

1. **Change default admin credentials immediately**
2. Consider implementing real authentication (Firebase Auth)
3. Add role-based access control for multiple admins
4. Enable audit logging for admin actions

---

## 🚨 Troubleshooting

### Images not uploading?

- Check Cloudinary credentials in `.env`
- Verify upload preset is unsigned
- Check browser console for errors

### Can't delete property?

- Ensure you're logged in as admin
- Check Firebase permissions
- Verify property ID is valid

### Admin login not working?

- Credentials: `admin` / `admin123`
- Check browser console for errors
- Verify login logic in component

---

## 🔮 Future Enhancements

Consider adding:

- [ ] Real authentication (Firebase Auth)
- [ ] Multiple admin roles
- [ ] Bulk property import
- [ ] Property analytics dashboard
- [ ] Image optimization automation
- [ ] Property status (sold, pending, available)
- [ ] Advanced search filters
- [ ] Property comparison feature

---

## 📞 Support

For issues or questions, check:

1. Browser developer console for errors
2. Firebase console for database issues
3. Cloudinary dashboard for upload issues
4. Network tab for API failures

---

**Last Updated:** January 3, 2026  
**Version:** 1.0.0  
**Status:** ✅ Fully Functional
