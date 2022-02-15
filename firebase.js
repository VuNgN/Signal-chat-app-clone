import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBLqLGOAgPU0l8W4fGz1ZUQ3QNd_M7Ps90",
  authDomain: "signalapp-d1f31.firebaseapp.com",
  projectId: "signalapp-d1f31",
  storageBucket: "signalapp-d1f31.appspot.com",
  messagingSenderId: "391568605769",
  appId: "1:391568605769:web:c9cf8d85ce69bec3eb7598",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
