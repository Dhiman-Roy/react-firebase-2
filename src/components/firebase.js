
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7eXc06hwKkUCYCPiXpP6NMOrAc3sT5qI",
  authDomain: "react-firebase-2-9ee9f.firebaseapp.com",
  projectId: "react-firebase-2-9ee9f",
  storageBucket: "react-firebase-2-9ee9f.appspot.com",
  messagingSenderId: "124003815315",
  appId: "1:124003815315:web:464ec3018dfc7ec11de266",
  measurementId: "G-P63K8HXM1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
