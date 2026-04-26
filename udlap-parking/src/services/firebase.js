import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAwOOyEb9eaTeACrNZpPTUV61top5yZrE",
  authDomain: "udlap-parking.firebaseapp.com",
  projectId: "udlap-parking",
  storageBucket: "udlap-parking.firebasestorage.app",
  messagingSenderId: "683740087691",
  appId: "1:683740087691:web:867e2e2819daec6ec0db8e"
};

const app = initializeApp(firebaseConfig);

// 🔥 EXPORTS CORRECTOS
export const auth = getAuth(app);
export const db = getFirestore(app);