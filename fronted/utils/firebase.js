// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortex-ai-d4136.firebaseapp.com",
  projectId: "cortex-ai-d4136",
  storageBucket: "cortex-ai-d4136.firebasestorage.app",
  messagingSenderId: "364087638627",
  appId: "1:364087638627:web:336218d811626d188ad656",
  measurementId: "G-JB7B3TH1ZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics=getAnalytics(app);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();