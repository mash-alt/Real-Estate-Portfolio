import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

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

async function removeDuplicates() {
  try {
    console.log('🗑️  Starting duplicate removal...\n');
    
    const propertiesRef = collection(db, 'listings');
    const snapshot = await getDocs(propertiesRef);

    const titleMap: Record<string, string[]> = {};
    
    // Group property IDs by title
    snapshot.docs.forEach(docSnapshot => {
      const title = docSnapshot.data().title;
      const id = docSnapshot.id;
      
      if (!titleMap[title]) {
        titleMap[title] = [];
      }
      titleMap[title].push(id);
    });

    let deletedCount = 0;

    // Delete duplicates (keep first occurrence of each title)
    for (const [title, ids] of Object.entries(titleMap)) {
      if (ids.length > 1) {
        console.log(`📌 ${title}: Found ${ids.length} copies`);
        
        // Keep the first ID, delete the rest
        for (let i = 1; i < ids.length; i++) {
          const docRef = doc(db, 'listings', ids[i]);
          await deleteDoc(docRef);
          console.log(`   ❌ Deleted duplicate: ${ids[i]}`);
          deletedCount++;
        }
        console.log(`   ✅ Kept: ${ids[0]}\n`);
      }
    }

    console.log('='.repeat(60));
    console.log(`✨ Cleanup complete!`);
    console.log(`🗑️  Deleted ${deletedCount} duplicate properties`);
    console.log(`✅ Remaining properties: ${snapshot.size - deletedCount}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('Error:', error);
  }
}

removeDuplicates();
