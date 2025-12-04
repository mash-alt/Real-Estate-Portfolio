# Firebase Migration Guide

## Setup Complete! ✅

Your real estate portfolio is now configured to use Firebase Firestore for data storage.

## What Changed:

1. **Firebase Configuration** - Added Firestore to `firebase-config.ts`
2. **Property Service** - Created `src/services/propertyService.ts` with CRUD operations
3. **Migration Script** - Created `src/scripts/migrateToFirebase.ts`
4. **Updated Components**:
   - Home.tsx - Now fetches featured properties from Firebase
   - Properties.tsx - Now fetches all properties from Firebase
   - PropertyDetail.tsx - Now fetches individual property by ID
   - TeamSection.tsx - Now fetches team members from Firebase

## Next Steps to Complete Migration:

### 1. Run the Migration Script

You need to run this script ONCE to upload your existing data to Firebase:

```bash
# Install tsx if you haven't
npm install -D tsx

# Run the migration script
npx tsx src/scripts/migrateToFirebase.ts
```

This will upload all 5 properties and 1 team member to your Firebase Firestore.

### 2. Configure Firebase Security Rules

Go to Firebase Console → Firestore Database → Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all properties
    match /properties/{property} {
      allow read: if true;
      allow write: if false; // Change to true if you want admin write access
    }
    
    // Allow read access to team members
    match /teamMembers/{member} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

### 3. Test the Application

```bash
npm run dev
```

Visit your site and verify:
- Home page shows featured properties
- Properties page shows all listings
- Individual property pages load correctly
- Team section shows your agent

### 4. Future: Adding New Properties

You have two options:

**Option A: Use Firebase Console (Easiest)**
1. Go to Firebase Console → Firestore Database
2. Click on `properties` collection
3. Click "Add document"
4. Fill in the fields

**Option B: Create an Admin Panel**
You can build an admin interface later to manage properties without touching code.

### 5. Optional: Remove Mock Data

Once you've verified everything works, you can delete:
- `src/data/mockData.ts` (no longer needed)
- `src/scripts/migrateToFirebase.ts` (only needed once)

## Benefits of Using Firebase:

✅ Real-time updates - Changes reflect immediately
✅ No redeployment needed - Update properties anytime
✅ Scalable - Can handle thousands of properties
✅ Fast - Optimized queries and caching
✅ Secure - Firestore security rules protect your data

## Need Help?

- Check Firebase Console for data
- View browser console for error messages
- Ensure Firebase project is active and has Firestore enabled
