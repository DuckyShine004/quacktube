import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's details.
 */
export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

/** Signs the user in.
 * @returns A promise that resolves when the user is signed out.
 */
export function signOut() {
  return auth.signOut();
}

/**
 * Triggers a callback when the user's auth state changes.
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
