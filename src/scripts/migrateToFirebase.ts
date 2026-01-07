import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { properties, teamMembers } from '../data/mockData';

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

const migrateData = async () => {
  console.log('Starting data migration to Firebase...');

  try {
    // Migrate properties
    console.log('Migrating properties to "listings" collection...');
    const propertiesCollection = collection(db, 'listings');
    
    for (const property of properties) {
      const { id, ...propertyData } = property; // Remove the id field
      await addDoc(propertiesCollection, propertyData);
      console.log(`✓ Migrated property: ${property.title}`);
    }

    // Migrate team members
    console.log('\nMigrating team members...');
    const teamMembersCollection = collection(db, 'teamMembers');
    
    for (const member of teamMembers) {
      const { id, ...memberData } = member; // Remove the id field
      await addDoc(teamMembersCollection, memberData);
      console.log(`✓ Migrated team member: ${member.name}`);
    }

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
};

// Run migration
migrateData();
