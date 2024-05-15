// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth"
import {getFirestore}  from "firebase/firestore"
import {getStorage}  from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC_ivpvOeN5VtvBKLorQUUitsRmudIjVk",
  authDomain: "chatcapstone-b7b39.firebaseapp.com",
  projectId: "chatcapstone-b7b39",
  storageBucket: "chatcapstone-b7b39.appspot.com",
  messagingSenderId: "820102661282",
  appId: "1:820102661282:web:5144847bcc03d8a2ee03fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth()
export const firebaseDb = getFirestore()
export const firebaseStorage = getStorage()