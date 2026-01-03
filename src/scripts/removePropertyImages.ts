import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// Load environment variables
config();

// Initialize Firebase for script
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const removeImagesFromProperties = async () => {
  console.log('Starting to remove image URLs from all properties...');

  try {
    const propertiesCollection = collection(db, 'listings');
    const querySnapshot = await getDocs(propertiesCollection);

    if (querySnapshot.empty) {
      console.log('No properties found in the database.');
      return;
    }

    console.log(`Found ${querySnapshot.size} properties to update.\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const docSnapshot of querySnapshot.docs) {
      const propertyData = docSnapshot.data();
      const propertyId = docSnapshot.id;
      const title = propertyData.title || 'Untitled Property';

      try {
        // Update the property to remove images field (set to empty array)
        const propertyRef = doc(db, 'listings', propertyId);
        await updateDoc(propertyRef, {
          images: []
        });

        successCount++;
        console.log(`✓ Removed images from: ${title} (ID: ${propertyId})`);
      } catch (error) {
        errorCount++;
        console.error(`✗ Failed to update ${title} (ID: ${propertyId}):`, error);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 Summary:');
    console.log(`   Total properties: ${querySnapshot.size}`);
    console.log(`   ✓ Successfully updated: ${successCount}`);
    console.log(`   ✗ Failed: ${errorCount}`);
    console.log('='.repeat(50));

    if (errorCount === 0) {
      console.log('\n✅ All property images removed successfully!');
    } else {
      console.log('\n⚠️  Some properties failed to update. Check errors above.');
    }
  } catch (error) {
    console.error('❌ Script failed:', error);
  }
};

// Run the script
removeImagesFromProperties();
