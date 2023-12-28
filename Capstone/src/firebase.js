// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCd9qf0FaL-BEuc_dJdAdtvoPUaes4Aonk",
  authDomain: "capstone-47f28.firebaseapp.com",
  projectId: "capstone-47f28",
  storageBucket: "capstone-47f28.appspot.com",
  messagingSenderId: "499004184046",
  appId: "1:499004184046:web:9b33796858ef301a966aff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage();

export const db = getFirestore();