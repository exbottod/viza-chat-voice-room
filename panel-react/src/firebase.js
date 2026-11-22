// Satu titik pendaftaran Firebase untuk seluruh panel React.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAAm1ylv5H4McTNvOut_0UdgiAFdxBBumI",
  authDomain: "my-app-e7f8c.firebaseapp.com",
  projectId: "my-app-e7f8c",
  storageBucket: "my-app-e7f8c.firebasestorage.app",
  messagingSenderId: "622104139221",
  appId: "1:622104139221:android:294ad10f9eed7350acd95c",
  databaseURL: "https://my-app-e7f8c-default-rtdb.asia-southeast1.firebasedatabase.app",
};

export const PEMILIK = "bangexx01@gmail.com";
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
