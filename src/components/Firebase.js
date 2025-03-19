// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth"; // Add this line

const firebaseConfig = {
  apiKey: "AIzaSyBtD7Df_L_5YPHB9opV-KGZsjzISkIvN9M",
  authDomain: "dejair-49f35.firebaseapp.com",
  projectId: "dejair-49f35",
  storageBucket: "dejair-49f35.appspot.com",
  messagingSenderId: "186331542288",
  appId: "1:186331542288:web:afbb765e2e402f5648ab95",
  measurementId: "G-JS7K6HZLWJ"
};

// Prevent duplicate initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const messaging = getMessaging(app);
export const auth = getAuth(app);
export const analytics = getAnalytics

