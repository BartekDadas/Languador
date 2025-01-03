import { auth } from '../../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider,
  signInAnonymously,
  type User 
} from 'firebase/auth';

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export function requireAuth(): User {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: any) {
    console.error('Google sign in error:', error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
}

export async function signInAsGuest() {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error: any) {
    console.error('Anonymous sign in error:', error);
    throw new Error(error.message || 'Failed to sign in as guest');
  }
}