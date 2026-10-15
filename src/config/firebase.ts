import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "accessmap-4b213.firebaseapp.com",
  projectId: "accessmap-4b213",
  storageBucket: "accessmap-4b213.firebasestorage.app",
  messagingSenderId: "632723565570",
  appId: "1:632723565570:web:2f109a4b2f462022ed0b1b",
  measurementId: "G-FFNMWHSKMQ",
};

// Check if Firebase is already running before initializing
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);