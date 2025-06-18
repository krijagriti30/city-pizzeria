// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkFmIryYsXFtH-Fczpdd-3NqsPIGPvUuI",
  authDomain: "citypizzeria-3030.firebaseapp.com",
  projectId: "citypizzeria-3030",
  storageBucket: "citypizzeria-3030.firebasestorage.app",
  messagingSenderId: "869542820756",
  appId: "1:869542820756:web:89eab827060516bf4bed81",
  measurementId: "G-RDX8Y5G6CH"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize and export Firestore
export const db = getFirestore(app);

// ✅ Initialize and export Auth (optional)
export const auth = getAuth(app);

// ✅ Initialize and export Analytics (optional)
export const analytics = getAnalytics(app);
