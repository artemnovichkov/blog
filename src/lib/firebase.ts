import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "blog-ad799.firebaseapp.com",
  databaseURL: "https://blog-ad799-default-rtdb.firebaseio.com",
  projectId: "blog-ad799",
  storageBucket: "blog-ad799.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_KEY,
};

const app = initializeApp(firebaseConfig);
export default getDatabase(app);