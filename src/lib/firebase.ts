// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config - Bu bilgileri Firebase Console'dan alacaksınız
const firebaseConfig = {
  apiKey: "AIzaSyDnkwsyizWF4KWzAgNtpTgmffC3cDXQu14",
  authDomain: "bimakas-emails.firebaseapp.com",
  projectId: "bimakas-emails",
  storageBucket: "bimakas-emails.firebasestorage.app",
  messagingSenderId: "210835491329",
  appId: "1:210835491329:web:d6df90f290f6e6d3afce00"
};

// Firebase'i initialize et
const app = initializeApp(firebaseConfig);

// Firestore database'i al
export const db = getFirestore(app);

export default app;
