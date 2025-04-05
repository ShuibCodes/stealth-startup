import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlk-GnkePXjy0jd7gnoRnuNprJ9-z4AjE",
  authDomain: "codingkids-ef37b.firebaseapp.com",
  projectId: "codingkids-ef37b",
  storageBucket: "codingkids-ef37b.firebasestorage.app",
  messagingSenderId: "646131079419",
  appId: "1:646131079419:web:38667cd076e376298cf85e",
};

const firebaseConfig2 = {
  apiKey: "AIzaSyDERcVBKOMQQJRjdBQqBq9Zkwpy855PfGo",
  authDomain: "codingkids-91234.firebaseapp.com",
  projectId: "codingkids-91234",
  storageBucket: "codingkids-91234.firebasestorage.app",
  messagingSenderId: "785106443306",
  appId: "1:785106443306:web:cdf667370f5a37cdda3753",
  measurementId: "G-45DE9FB4P8"
};

// Initialize Firebase instances
const app = initializeApp(firebaseConfig);
const app2 = initializeApp(firebaseConfig2, 'app2');

// Initialize services
const auth = getAuth(app);
const db2 = getFirestore(app2);

export { auth, db2 };
