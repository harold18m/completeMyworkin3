// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfjW_DrMNv-Z0mXg3ynVhVxdZ9q6VaWrQ",
  authDomain: "works-today.firebaseapp.com",
  projectId: "works-today",
  storageBucket: "works-today.firebasestorage.app",
  messagingSenderId: "253625369676",
  appId: "1:253625369676:web:754edb514ea782cf8160e9",
  measurementId: "G-J8PBL6XKZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Comentado para evitar errores en SSR

// Initialize Firestore
export const db = getFirestore(app);
export default app; 