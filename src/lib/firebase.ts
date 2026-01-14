import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock_key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock_domain",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://mock.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock_project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock_bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "mock_sender",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "mock_app_id",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "mock_measurement_id",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getDatabase(app);
export const auth = getAuth(app);
