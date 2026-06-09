import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8gMtt4PoB-i0_0iYKKqc_8Kohh1oDbIg",
  authDomain: "summarist-b5afe.firebaseapp.com",
  projectId: "summarist-b5afe",
  storageBucket: "summarist-b5afe.firebasestorage.app",
  messagingSenderId: "291765402680",
  appId: "1:291765402680:web:e298b3252cc16c7585bacd",
  measurementId: "G-D878VQZDWL",
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export type FirebaseUser = User;
