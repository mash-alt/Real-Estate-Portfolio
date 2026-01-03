# Upload Local Property Images to Cloudinary

## Overview
This guide walks you through uploading all local property images to Cloudinary and updating your Firebase database with the new URLs.

## Prerequisites

### 1. Get Your Cloudinary API Secret
The script needs your API secret to upload images programmatically.

**Steps:**
1. Go to [Cloudinary Dashboard](https://console.cloudinary.com/)
2. Login with your account
3. On the dashboard, you'll see:
   - Cloud Name: `dtsoyzdfu` ✓
   - API Key: `939889813463843` ✓
   - API Secret: `[Click "Reveal" or eye icon]`
4. Copy your API Secret

### 2. Update the Script
1. Open `src/scripts/uploadLocalImages.ts`
2. Find line 9: `api_secret: 'YOUR_API_SECRET'`
3. Replace `YOUR_API_SECRET` with your actual API secret
4. Save the file

Example:
```typescript
cloudinary.config({
  cloud_name: 'dtsoyzdfu',
  api_key: '939889813463843',
  api_secret: 'abc123XYZ456', // Your actual secret here
});
```

## Running the Upload Script

### Option 1: Using tsx (Recommended)
```powershell
cd "d:\realestate portfolio"
npx tsx src/scripts/uploadLocalImages.ts
```

### Option 2: Compile and Run
```powershell
cd "d:\realestate portfolio"
npm run build
node dist/scripts/uploadLocalImages.js
```

## What the Script Does

1. **Scans** each property folder in `d:\realestate portfolio\properties\`
2. **Uploads** all images (.jpg, .jpeg, .png, .gif, .webp) to Cloudinary
3. **Organizes** images in folders: `/real-estate/properties/{property_id}/`
4. **Tags** each image with:
   - `real_estate`
   - `property`
   - Property ID
   - Location
5. **Adds metadata**:
   - Property ID
   - Property title
   - Property location
   - Upload date
   - Image index
6. **Saves results** to `src/scripts/uploadResults.json`
7. **Displays** Firebase-ready image URLs in console

## Property Mapping

The script will process these properties:

| Folder Name | Property ID | Title |
|------------|-------------|-------|
| 1BR at Avida Riala | property_1br_at_avida_riala | 1BR at Avida Riala |
| Baseline Premier, Cebu City | property_baseline_premier,_cebu_city | Baseline Premier, Cebu City |
| City Suites Ramos Tower, F. Ramos St., Cebu City | property_city_suites_ramos_tower | City Suites Ramos Tower |
| Jtower | property_jtower_condominium | Jtower Condominium |
| kishanta | property_kishanta_subdivision | Kishanta Subdivision |
| 𝐌𝐮𝐥𝐛𝐞𝐫𝐫𝐲 𝐃𝐫𝐢𝐯𝐞 𝐢𝐧 𝐓𝐚𝐥𝐚𝐦𝐛𝐚𝐧 | property_mulberry_drive_talamban | Mulberry Drive Talamban |

## Expected Output

```
Starting property image upload to Cloudinary...
============================================================

Processing: 1BR at Avida Riala
Property ID: property_1br_at_avida_riala
Folder: d:\realestate portfolio\properties\1BR at Avida Riala

Uploading 9 images for 1BR at Avida Riala...
✓ Uploaded: 580588045_122193934994505927_5253524997664266426_n.jpg -> https://res.cloudinary.com/...
✓ Uploaded: 581949803_122193934826505927_3541532887922273510_n.jpg -> https://res.cloudinary.com/...
...
✓ Successfully uploaded 9 images

[... continues for all properties ...]

============================================================
UPLOAD SUMMARY
============================================================

1BR at Avida Riala:
  Property ID: property_1br_at_avida_riala
  Images uploaded: 9

[... summary for all properties ...]

✓ Results saved to: d:\realestate portfolio\src\scripts\uploadResults.json

============================================================
PROPERTY DATA FOR FIREBASE
============================================================

// 1BR at Avida Riala
images: [
  "https://res.cloudinary.com/dtsoyzdfu/image/upload/v1234567890/real-estate/properties/property_1br_at_avida_riala/image_1.jpg",
  "https://res.cloudinary.com/dtsoyzdfu/image/upload/v1234567890/real-estate/properties/property_1br_at_avida_riala/image_2.jpg",
  ...
]
```

## Next Steps

### 1. Review Upload Results
Check `src/scripts/uploadResults.json` to see all uploaded image URLs.

### 2. Update Property Details
Before adding to Firebase, you need to complete the property details in the script:
- Price
- Area
- Bedrooms
- Bathrooms
- Features
- Description (expand the basic description)

### 3. Create Firebase Import Script
I'll create a script to add these properties to Firebase with the uploaded Cloudinary URLs.

## Troubleshooting

### Error: "Invalid API credentials"
- Double-check your API secret in the script
- Make sure there are no extra spaces or quotes

### Error: "File not found"
- Verify the properties folder path is correct
- Check folder names match exactly (case-sensitive)

### Error: "Upload failed"
- Check your internet connection
- Verify Cloudinary account is active
- Check if you've exceeded free tier limits

### Images uploaded but URLs not showing
- Check the console output
- Look at `uploadResults.json` file
- Verify in Cloudinary dashboard under Media Library

## Customization

### Change Property Details
Edit the `propertyFolders` array in `uploadLocalImages.ts`:
```typescript
{
  folderName: '1BR at Avida Riala',
  propertyData: {
    title: 'Your Custom Title',
    type: 'Condominium',
    location: 'Cebu',
    price: 5000000,
    area: 50,
    bedrooms: 1,
    bathrooms: 1,
    description: 'Your detailed description',
    features: ['Feature 1', 'Feature 2'],
  }
}
```

### Change Cloudinary Organization
Modify the upload options in `uploadPropertyImages()`:
```typescript
const result = await cloudinary.uploader.upload(filePath, {
  folder: `your-custom/folder/path`,
  tags: ['your', 'custom', 'tags'],
  // ... other options
});
```

## Important Notes

⚠️ **API Secret Security**: Never commit your API secret to version control. Consider using environment variables.

✅ **Cloudinary Free Tier**: Includes 25 GB storage and 25 GB bandwidth/month. This should be sufficient for ~500-1000 property images.

📊 **Image Optimization**: Cloudinary automatically optimizes images. You can access different sizes using URL transformations.

🔒 **Backup**: Keep your local images as backup until you verify all uploads are successful.

## Support

If you encounter issues:
1. Check Cloudinary dashboard for upload status
2. Review `uploadResults.json` for error details
3. Check console output for specific error messages
4. Verify all credentials are correct
