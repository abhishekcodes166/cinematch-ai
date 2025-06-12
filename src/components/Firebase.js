// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8F31ORTGN9I0-K6hm0r9uJf21WGNNiDM",
  authDomain: "cinematch-ai-fe98d.firebaseapp.com",
  projectId: "cinematch-ai-fe98d",
  storageBucket: "cinematch-ai-fe98d.firebasestorage.app",
  messagingSenderId: "580258344045",
  appId: "1:580258344045:web:e453325adb0caa1cc9a364",
  measurementId: "G-6J2392H0J8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;
