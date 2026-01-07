import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// Firebase config using Node.js environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Status mapping based on property IDs
const statusMapping: Record<string, 'preselling' | 'for-sale' | 'for-rent'> = {
  'Estelle Woods Talamban - Jose Antonio': 'preselling',
  'Estelle Woods Talamban - Matteo Inigo': 'preselling',
  'Costa Liya Subdivision': 'preselling',
  'The Highlands at Robin\'s Lane': 'preselling',
  'Kishanta Subdivision Lot': 'for-sale',
  'Mulberry Drive Talamban - Sacrifice Sale': 'for-sale',
  'Avida Riala IT Park - 1BR for Rent': 'for-rent',
  'J Tower Residences - SM Jmall Mandaue': 'for-sale',
  'Deo City Condominiums - Cozy Loft': 'for-sale',
  'Vista Verde Subdivision - 241 sqm Lot': 'for-sale',
  'Vista Verde Subdivision - 314 sqm Lot': 'for-sale',
  'Baseline Premier - 1BR Condo for Rent': 'for-rent',
  'City Suites Ramos Tower - Studio Near Velez Hospital': 'for-sale',
};

async function addPropertyStatus() {
  try {
    console.log('🚀 Starting property status migration...\n');

    const propertiesRef = collection(db, 'listings');
    const snapshot = await getDocs(propertiesRef);

    console.log(`📊 Found ${snapshot.size} properties to update\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const docSnapshot of snapshot.docs) {
      const propertyId = docSnapshot.id;
      const propertyData = docSnapshot.data();
      const propertyTitle = propertyData.title as string;
      const status = statusMapping[propertyTitle];

      if (status) {
        try {
          const propertyRef = doc(db, 'listings', propertyId);
          await updateDoc(propertyRef, { status });
          
          console.log(`✅ Updated Property: ${propertyTitle}`);
          console.log(`   Status: ${status}\n`);
          successCount++;
        } catch (error) {
          console.error(`❌ Error updating property ${propertyTitle}:`, error);
          errorCount++;
        }
      } else {
        console.log(`⚠️  No status mapping for property: ${propertyTitle}\n`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('✨ Migration Complete!');
    console.log(`✅ Successfully updated: ${successCount} properties`);
    if (errorCount > 0) {
      console.log(`❌ Errors: ${errorCount} properties`);
    }
    console.log('='.repeat(60));

  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
addPropertyStatus();
