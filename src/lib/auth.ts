import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signInAnonymously,
  type User,
  type AuthError
} from 'firebase/auth';
import { auth } from './firebase';
import { createUserProfile } from '../services/userService';

export class AuthenticationError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export async function signInWithGoogle(): Promise<User> {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await createUserProfile(result.user);
    return result.user;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Google sign in error:', authError);
    
    switch (authError.code) {
      case 'auth/popup-blocked':
        throw new AuthenticationError('Please allow popups for this website to sign in with Google.', authError.code);
      case 'auth/popup-closed-by-user':
        throw new AuthenticationError('Sign in was cancelled. Please try again.', authError.code);
      case 'auth/network-request-failed':
        throw new AuthenticationError('Network error. Please check your connection and try again.', authError.code);
      default:
        throw new AuthenticationError('Failed to sign in with Google. Please try again later.', authError.code);
    }
  }
}

export async function signInAsGuest(): Promise<User> {
  try {
    const result = await signInAnonymously(auth);
    await createUserProfile(result.user);
    return result.user;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Guest sign in error:', authError);
    
    switch (authError.code) {
      case 'auth/network-request-failed':
        throw new AuthenticationError('Network error. Please check your connection and try again.', authError.code);
      default:
        throw new AuthenticationError('Failed to sign in as guest. Please try again later.', authError.code);
    }
  }
}

export function getDisplayName(user: User | null): string {
  if (!user) return 'Guest';
  if (user.isAnonymous) {
    return `Guest_${user.uid.slice(0, 4)}`;
  }
  return user.displayName || `User_${user.uid.slice(0, 4)}`;
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export function requireAuth(): User {
  const user = getCurrentUser();
  if (!user) {
    throw new AuthenticationError('Authentication required');
  }
  return user;
}