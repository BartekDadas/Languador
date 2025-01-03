import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  serverTimestamp,
  type CollectionReference, 
  type DocumentData,
  type QueryConstraint
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { requireAuth } from '../../lib/auth';

export class DatabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export async function getDocuments(collectionPath: string, constraints: QueryConstraint[] = []): Promise<DocumentData[]> {
  try {
    const collectionRef = collection(db, collectionPath);
    const q = constraints.length > 0 ? query(collectionRef, ...constraints) : query(collectionRef);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting documents from ${collectionPath}:`, error);
    throw new DatabaseError(`Failed to get documents from ${collectionPath}`);
  }
}

export async function addDocument(collectionPath: string, data: any): Promise<string> {
  const user = requireAuth();

  try {
    const collectionRef = collection(db, collectionPath);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionPath}:`, error);
    throw new DatabaseError(`Failed to add document to ${collectionPath}`);
  }
}

export async function updateDocument(collectionPath: string, docId: string, data: any): Promise<void> {
  const user = requireAuth();

  try {
    const docRef = doc(db, collectionPath, docId);
    await updateDoc(docRef, {
      ...data,
      updatedBy: user.uid,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionPath}:`, error);
    throw new DatabaseError(`Failed to update document in ${collectionPath}`);
  }
}

export async function deleteDocument(collectionPath: string, docId: string): Promise<void> {
  requireAuth();

  try {
    const docRef = doc(db, collectionPath, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionPath}:`, error);
    throw new DatabaseError(`Failed to delete document from ${collectionPath}`);
  }
}