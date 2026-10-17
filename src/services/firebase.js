import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyCeMCbszR4QXoIXm6KIXuYy384p0IVaOvw",
  authDomain: "clgnetwork-manager.firebaseapp.com",
  databaseURL: "https://clgnetwork-manager-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "clgnetwork-manager",
  storageBucket: "clgnetwork-manager.firebasestorage.app",
  messagingSenderId: "817430734193",
  appId: "1:817430734193:web:abaef68c2910bcbd3902d0",
  measurementId: "G-KJVYWKQ3SP"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
