// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2GxdwLUn5bTYxeURz0IXNacQ-nMQPhk8",
  authDomain: "realestate-portfol.firebaseapp.com",
  projectId: "realestate-portfol",
  storageBucket: "realestate-portfol.firebasestorage.app",
  messagingSenderId: "376582734599",
  appId: "1:376582734599:web:48659a049eb0ca09cabba2",
  measurementId: "G-CHPXZ2NJ6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Export for future use (e.g., authentication, database)
export { app };
