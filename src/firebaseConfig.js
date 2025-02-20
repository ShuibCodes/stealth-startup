import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlk-GnkePXjy0jd7gnoRnuNprJ9-z4AjE",
  authDomain: "codingkids-ef37b.firebaseapp.com",
  projectId: "codingkids-ef37b",
  storageBucket: "codingkids-ef37b.firebasestorage.app",
  messagingSenderId: "646131079419",
  appId: "1:646131079419:web:38667cd076e376298cf85e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
