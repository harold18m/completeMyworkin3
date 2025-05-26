// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration usando variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCfc9uJafS9qo0csb7M4eXm48KCd_GUI8A",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "worky-wp.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "worky-wp",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "worky-wp.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "701939730349",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:701939730349:web:f04f1bb977d5449982c324"
};

// Initialize Firebase with a specific name
const app = initializeApp(firebaseConfig, 'countdown-app');
// const analytics = getAnalytics(app); // Comentado para evitar errores en SSR

// Initialize Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;