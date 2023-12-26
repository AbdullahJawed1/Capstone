// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFayL4apAidTQMoSYVLcmF0nYsr0o6sCA",
  authDomain: "reactchat-a34e6.firebaseapp.com",
  projectId: "reactchat-a34e6",
  storageBucket: "reactchat-a34e6.appspot.com",
  messagingSenderId: "342825283784",
  appId: "1:342825283784:web:ddfc87c790edba88c675fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const storage = getStorage();

export const db = getFirestore();