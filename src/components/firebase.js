// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1E-zxMVVCY2IaldH7hGi5vDiINrkSCQA",
  authDomain: "mentalhealthstories-512a6.firebaseapp.com",
  projectId: "mentalhealthstories-512a6",
  storageBucket: "mentalhealthstories-512a6.appspot.com",
  messagingSenderId: "574890379",
  appId: "1:574890379:web:e2fe9ca579ea76bba88f8e",
  measurementId: "G-97YYN7KVSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Storage
const storage = getStorage(app);

export default storage;
