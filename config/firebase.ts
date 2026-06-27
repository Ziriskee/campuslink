// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmhY9nQVJOHPw9LYUEERMQX69QM3uBORE",
  authDomain: "campuslink-a6c0f.firebaseapp.com",
  projectId: "campuslink-a6c0f",
  storageBucket: "campuslink-a6c0f.firebasestorage.app",
  messagingSenderId: "910749339261",
  appId: "1:910749339261:web:0c17682b904ba0f9906b14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db}