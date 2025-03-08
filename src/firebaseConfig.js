import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDERcVBKOMQQJRjdBQqBq9Zkwpy855PfGo",
  authDomain: "codingkids-91234.firebaseapp.com",
  projectId: "codingkids-91234",
  storageBucket: "codingkids-91234.firebasestorage.app",
  messagingSenderId: "785106443306",
  appId: "1:785106443306:web:cdf667370f5a37cdda3753",
  measurementId: "G-45DE9FB4P8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
