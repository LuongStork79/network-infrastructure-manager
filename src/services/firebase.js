import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyA_DbmcwaEX1zKGeVPN1X5KG2cc2CU9nvE",
  authDomain: "aquamarine-networking.firebaseapp.com",
  projectId: "aquamarine-networking",
  storageBucket: "aquamarine-networking.firebasestorage.app",
  messagingSenderId: "418558744740",
  appId: "1:418558744740:web:62c7c35e71b79bfa5f6e31",
  measurementId: "G-Z45DR76HTV"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
