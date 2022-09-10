import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUPLIC_FIREBASE_API_KEY,
  authDomain: 'twitter-clone-c1421.firebaseapp.com',
  projectId: 'twitter-clone-c1421',
  storageBucket: 'twitter-clone-c1421.appspot.com',
  messagingSenderId: '832015600850',
  appId: '1:832015600850:web:85b5e35213cc7f5451310b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Collections Ref
const tweetsCollectionRef = collection(db, 'tweets');

export { storage, tweetsCollectionRef };
