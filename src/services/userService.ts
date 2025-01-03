import type { User } from 'firebase/auth';

export async function createUserProfile(user: User): Promise<void> {
  // Mock implementation
  console.log('Creating user profile:', user.uid);
}

export async function updateUserStats(score: number, isCorrect: boolean): Promise<void> {
  // Mock implementation
  console.log('Updating user stats:', { score, isCorrect });
}