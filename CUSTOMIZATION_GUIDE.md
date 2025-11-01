# Quick Customization Guide

## 🎨 Easy Changes You Can Make

### 1. Change Colors (5 minutes)

Open `src/styles/index.css` and update these colors:

```css
:root {
  --primary-color: #2c3e50;    /* Change to your brand color */
  --secondary-color: #3498db;  /* Change to your accent color */
  --accent-color: #e74c3c;     /* Change for featured items */
}
```

**Popular Color Schemes:**
- **Professional Blue**: primary: `#1a365d`, secondary: `#2563eb`, accent: `#dc2626`
- **Luxury Gold**: primary: `#1f2937`, secondary: `#d97706`, accent: `#b91c1c`
- **Modern Green**: primary: `#064e3b`, secondary: `#10b981`, accent: `#f59e0b`
- **Elegant Purple**: primary: `#4c1d95`, secondary: `#8b5cf6`, accent: `#ec4899`

### 2. Update Company Name & Logo (2 minutes)

**File**: `src/components/Navbar.tsx`

Find this section (around line 20):
```tsx
<Link to="/" className="navbar-logo">
  <span className="logo-icon">🏠</span>
  <span className="logo-text">Prime Realty</span>
</Link>
```

Change `🏠` to any emoji or remove it
Change `Prime Realty` to your company name

### 3. Add Your Messenger Link (1 minute)

**Find and replace** `YOUR_PAGE_ID` with your actual Facebook Page ID in:
- `src/components/Navbar.tsx` (line 15)
- `src/pages/Home.tsx` (line 117)
- `src/pages/PropertyDetail.tsx` (line 32)

**How to get your Facebook Page ID:**
1. Go to your Facebook Page
2. Click "About"
3. Scroll down to find "Page ID"
4. Copy the number

Example: `https://m.me/123456789012345`

### 4. Update Contact Information (5 minutes)

**File**: `src/components/Footer.tsx`

Update:
- Email address
- Phone number
- Social media links

### 5. Add Real Properties (10 minutes per property)

**File**: `src/data/mockData.ts`

Copy this template and add to the `properties` array:

```typescript
{
  id: '10', // Increment this number
  title: 'Your Property Title',
  type: 'Condominium', // or 'House and Lot', 'Lot-only', 'Office Space'
  location: 'Cebu', // or Manila, Palawan, Boracay, Davao, Baguio, Iloilo
  price: 5000000, // Price in PHP
  area: 50, // Square meters
  bedrooms: 2, // Optional, remove if not applicable
  bathrooms: 1, // Optional, remove if not applicable
  description: 'Your detailed property description here',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  images: [
    'https://your-image-url-1.jpg',
    'https://your-image-url-2.jpg'
  ],
  featured: true, // Set to true for featured properties
},
```

**Image Tips:**
- Use high-quality images (at least 1200px wide)
- Free stock photos: Unsplash, Pexels, Pixabay
- Upload your own to: Imgur, Cloudinary, or your hosting

### 6. Update Team Members (5 minutes per person)

**File**: `src/data/mockData.ts`

Find the `teamMembers` array and update:

```typescript
{
  id: '1',
  name: 'Your Name',
  position: 'Your Position',
  image: 'https://your-photo-url.jpg',
  email: 'your.email@company.com',
  phone: '+63 912 345 6789',
},
```

### 7. Customize Homepage Text (10 minutes)

**File**: `src/pages/Home.tsx`

**Hero Section** (lines 12-26):
- Change title and subtitle

**About Section** (lines 29-53):
- Update company description
- Change statistics (500+ Properties, etc.)

**Services Section** (lines 80-110):
- Update service descriptions
- Add/remove services

### 8. Change Hero Background Image

**File**: `src/styles/Home.css`

Find line 9 and change the URL:
```css
background-image: url('https://your-image-url.jpg');
```

## 🚀 Quick Start Checklist

Before showing to your client:

- [ ] Change company name in navbar
- [ ] Update all contact information
- [ ] Add messenger link
- [ ] Update color scheme
- [ ] Add at least 3 real properties
- [ ] Update team member info
- [ ] Test on mobile device
- [ ] Check all links work

## 💡 Tips for Best Results

1. **Images**: Use consistent image sizes and quality
2. **Descriptions**: Write clear, compelling property descriptions
3. **Features**: List actual amenities and features
4. **Pricing**: Use real prices or "Contact for Price"
5. **Team Photos**: Professional headshots work best
6. **Contact Info**: Double-check phone numbers and emails
7. **Test Everything**: Click through all pages before presenting

## 🔄 Adding New Locations

**File**: `src/types/index.ts`

Add to the Location type:
```typescript
export type Location = 'Cebu' | 'Manila' | 'Palawan' | 'Boracay' | 'Davao' | 'Baguio' | 'Iloilo' | 'YourNewLocation';
```

Then update:
- `src/components/SearchBar.tsx` (line 10)
- `src/pages/Properties.tsx` (line 13)

## 🆘 Common Questions

**Q: How do I change the number of featured properties?**
A: Edit `src/pages/Home.tsx`, line 8. Change the filter or slice number.

**Q: Can I add more property types?**
A: Yes! Update `src/types/index.ts`, then update the dropdowns in SearchBar and Navbar.

**Q: How do I remove the team section?**
A: Comment out or delete `<TeamSection />` in `src/pages/Home.tsx`

**Q: Images not loading?**
A: Check that URLs are valid and accessible. Use https:// not http://

**Q: Want to add a blog or news section?**
A: Create a new page in `src/pages/`, add a route in `App.tsx`, and link in navbar.

---

Need more help? Check the main README.md file!
