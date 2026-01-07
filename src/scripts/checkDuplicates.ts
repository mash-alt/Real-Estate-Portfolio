import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Initialize Firebase with environment variables (Node.js compatible)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkDuplicates() {
  try {
    const propertiesRef = collection(db, 'listings');
    const snapshot = await getDocs(propertiesRef);

    console.log(`\n📊 Total properties in database: ${snapshot.size}\n`);

    const titleCounts: Record<string, number> = {};
    
    snapshot.docs.forEach(doc => {
      const title = doc.data().title;
      titleCounts[title] = (titleCounts[title] || 0) + 1;
    });

    console.log('Properties by count:\n');
    Object.entries(titleCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([title, count]) => {
        const icon = count > 1 ? '⚠️ ' : '✅';
        console.log(`${icon} ${title}: ${count}x`);
      });

    const duplicates = Object.entries(titleCounts).filter(([, count]) => count > 1);
    
    if (duplicates.length > 0) {
      console.log(`\n⚠️  Found ${duplicates.length} properties with duplicates`);
      console.log('You may want to remove duplicates from Firebase Console\n');
    } else {
      console.log('\n✅ No duplicates found!\n');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

checkDuplicates();
