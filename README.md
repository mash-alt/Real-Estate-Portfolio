# Real Estate Portfolio Template

A modern, responsive real estate portfolio website built with React, TypeScript, and React Router. Includes automated deployment with GitHub Actions.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Property Listings**: Comprehensive property showcase with detailed information
- **Advanced Filtering**: Filter properties by type, location, and price range
- **Property Types**: Condominium, House and Lot, Lot-only, Office Space
- **7 Locations**: Cebu, Manila, Palawan, Boracay, Davao, Baguio, Iloilo
- **Search Functionality**: Quick property search with multiple criteria
- **Property Details**: Individual property pages with image galleries
- **Team Section**: Showcase your real estate team members
- **Contact Form**: Professional lead capture form with validation
- **Social Media Integration**: Messenger, WhatsApp, and Instagram contact options
- **Professional Design**: Clean, modern UI with easy-to-customize colors
- **SEO Optimized**: Meta tags, structured data, sitemap for Google indexing
- **GitHub Actions**: Automated build and deployment workflow

## 📦 Quick Start

### Option 1: Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Option 2: Deploy to GitHub

**Using PowerShell (Windows):**
```powershell
.\push-to-github.ps1
```

**Using Bash (Mac/Linux):**
```bash
chmod +x push-to-github.sh
./push-to-github.sh
```

**Or manually:**
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Then follow the **[GitHub Actions Setup Guide](GITHUB_ACTIONS_SETUP.md)** to configure automatic deployment.

## 🌐 Deployment Options

This template supports three free hosting platforms:

| Platform | Best For | Setup Difficulty | Custom Domain |
|----------|----------|------------------|---------------|
| **GitHub Pages** | Simple portfolios | Easy | Free with GitHub Pro |
| **Netlify** | Professional sites | Medium | ✅ Free |
| **Vercel** | High performance | Medium | ✅ Free |

See **[GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)** for detailed instructions on each platform.

## 🎨 Design & Customization

### Color Scheme
The design uses CSS variables for easy customization. Edit `src/styles/index.css`:

```css
:root {
  --primary-color: #2c3e50;      /* Main brand color */
  --secondary-color: #3498db;    /* Accent color */
  --accent-color: #e74c3c;       /* Featured badges */
  --text-color: #333;            /* Main text */
  --text-light: #666;            /* Secondary text */
  --bg-light: #f8f9fa;           /* Background */
}
```

### Customization Guide

#### 1. Update Company Information
- **Logo & Name**: Edit `src/components/Navbar.tsx` (line 20-22)
- **Contact Info**: Edit `src/components/Footer.tsx`
- **About Section**: Edit `src/pages/Home.tsx` (lines 41-57)

#### 2. Messenger Integration
Replace `YOUR_PAGE_ID` with your Facebook Page ID in:
- `src/components/Navbar.tsx` (line 15)
- `src/pages/Home.tsx` (line 117)
- `src/pages/PropertyDetail.tsx` (line 32)

#### 3. Add/Edit Properties
Edit `src/data/mockData.ts`:
- Add new properties to the `properties` array
- Update locations, prices, descriptions, images

#### 4. Update Team Members
Edit `src/data/mockData.ts`:
- Modify the `teamMembers` array
- Update names, positions, photos, contact info

#### 5. Change Images
- Replace image URLs in `src/data/mockData.ts`
- Hero image: `src/styles/Home.css` (line 9)
- Use your own property photos

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx      # Navigation bar with dropdown
│   ├── Footer.tsx      # Footer section
│   ├── PropertyCard.tsx # Property card component
│   ├── SearchBar.tsx   # Property search form
│   └── TeamSection.tsx # Team members display
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── Properties.tsx  # Properties listing page
│   └── PropertyDetail.tsx # Individual property page
├── data/               # Mock data
│   └── mockData.ts     # Properties and team data
├── types/              # TypeScript types
│   └── index.ts        # Type definitions
└── styles/             # CSS files
    ├── index.css       # Global styles
    ├── Navbar.css      # Navbar styles
    ├── Footer.css      # Footer styles
    ├── Home.css        # Homepage styles
    ├── Properties.css  # Properties page styles
    └── PropertyDetail.css # Detail page styles
```

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Pages

### Home Page (`/`)
- Hero section with statistics
- About section
- Property search bar
- Featured properties
- Recent listings preview
- Services section
- Team members
- Call-to-action section

### Properties Page (`/properties`)
- Filterable property grid
- Filter by type and location
- Responsive sidebar filters
- Property count display
- Mobile-friendly filter toggle

### Property Detail Page (`/properties/:id`)
- Image gallery with thumbnails
- Property specifications
- Features and amenities list
- Contact card with inquiry button
- Social sharing options

## 🎯 Key Features for Client Presentation

1. **Easy Navigation**: Intuitive menu with property type dropdown
2. **Mobile-First**: Fully responsive design works on all devices
3. **Professional Layout**: Clean, modern design that builds trust
4. **Quick Search**: Prominent search feature on homepage
5. **Detailed Listings**: Comprehensive property information
6. **Direct Communication**: Messenger integration for instant contact
7. **Team Showcase**: Build credibility with team member profiles
8. **Service Highlights**: Display your real estate services
9. **Location Coverage**: Show properties across 7 major locations
10. **Easy Updates**: Simple data structure for adding/editing properties

## 🔧 Customization Checklist

- [ ] Update company name and logo
- [ ] Add your Facebook Messenger Page ID
- [ ] Replace placeholder team member information
- [ ] Add real property data and images
- [ ] Customize color scheme
- [ ] Update contact information
- [ ] Add your company description
- [ ] Update service offerings
- [ ] Test all links and navigation
- [ ] Verify responsive design on mobile

## 📝 Notes for Your Client

This is a **template** designed to showcase your real estate portfolio. All content (properties, team members, images) can be easily customized to match your actual listings and team.

The design is intentionally clean and professional to work with any color scheme you choose. The structure is solid and maintainable, making it easy to update properties and information as your business grows.

## 🌟 Technologies Used

- **React 19**: Modern UI library
- **TypeScript**: Type-safe development
- **React Router**: Client-side routing
- **CSS3**: Modern styling with CSS variables
- **Vite**: Fast build tool and dev server

---

**Ready to impress your client!** 🚀

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
