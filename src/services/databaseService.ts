import { ref, set, get, update, remove } from 'firebase/database';
import { db } from '../lib/firebase';
import { requireAuth } from '../lib/auth';

// Generic database service for CRUD operations
export class DatabaseService<T extends { id?: string }> {
  constructor(private basePath: string) {}

  // Create a new record
  async create(data: Omit<T, 'id'>): Promise<string> {
    const user = requireAuth();
    const newRef = ref(db, `${this.basePath}/${crypto.randomUUID()}`);
    
    const record = {
      ...data,
      createdBy: user.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await set(newRef, record);
    return newRef.key!;
  }

  // Read a single record
  async get(id: string): Promise<T | null> {
    const snapshot = await get(ref(db, `${this.basePath}/${id}`));
    return snapshot.exists() ? { id: snapshot.key!, ...snapshot.val() } : null;
  }

  // Read all records
  async getAll(): Promise<T[]> {
    const snapshot = await get(ref(db, this.basePath));
    const items: T[] = [];
    
    snapshot.forEach((child) => {
      items.push({ id: child.key!, ...child.val() });
    });
    
    return items;
  }

  // Update a record
  async update(id: string, data: Partial<T>): Promise<void> {
    const user = requireAuth();
    const updates = {
      ...data,
      updatedBy: user.uid,
      updatedAt: new Date().toISOString(),
    };
    
    await update(ref(db, `${this.basePath}/${id}`), updates);
  }

  // Delete a record
  async delete(id: string): Promise<void> {
    await remove(ref(db, `${this.basePath}/${id}`));
  }

  // Real-time subscription
  subscribe(callback: (items: T[]) => void): () => void {
    const dbRef = ref(db, this.basePath);
    
    const unsubscribe = get(dbRef).then((snapshot) => {
      const items: T[] = [];
      snapshot.forEach((child) => {
        items.push({ id: child.key!, ...child.val() });
      });
      callback(items);
    });

    return () => {
      // Cleanup subscription
      unsubscribe;
    };
  }
}