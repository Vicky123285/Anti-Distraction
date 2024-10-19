// // Import the functions you need from the SDKs you need
// import { initializeApp,getApp, getApps } from "firebase/app";
 import { getAuth, sendPasswordResetEmail } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.API_KEY,
//   authDomain: import.meta.env.AUTH_DOMAIN,
//   //databaseURL: "https://studentdistarctionapp-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: import.meta.env.PROJECT_ID,
//   storageBucket: import.meta.env.STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.MESSAGE_SENDER_ID,
//   appId: import.meta.env.APP_ID,
// };

// // Initialize Firebase
//const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV6RJ_I6vlqVUVY_FtaBrWWUu3W-NJ9Bk",
  authDomain: "studentdistarctionapp.firebaseapp.com",
  databaseURL: "https://studentdistarctionapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studentdistarctionapp",
  storageBucket: "studentdistarctionapp.appspot.com",
  messagingSenderId: "175644327815",
  appId: "1:175644327815:web:74b25aaf76990d5ff99d22",
  measurementId: "G-VHEGDT0TPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };