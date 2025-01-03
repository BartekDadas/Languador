import { useState, useEffect } from 'react';
import { DatabaseService } from '../services/databaseService';

export function useDatabase<T extends { id?: string }>(
  path: string,
  deps: any[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const service = new DatabaseService<T>(path);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const items = await service.getAll();
        if (isMounted) {
          setData(items);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load data'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [...deps]);

  const create = async (item: Omit<T, 'id'>) => {
    try {
      const id = await service.create(item);
      setData(prev => [...prev, { ...item, id } as T]);
      return id;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create item');
    }
  };

  const update = async (id: string, updates: Partial<T>) => {
    try {
      await service.update(id, updates);
      setData(prev => 
        prev.map(item => 
          item.id === id ? { ...item, ...updates } : item
        )
      );
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update item');
    }
  };

  const remove = async (id: string) => {
    try {
      await service.delete(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete item');
    }
  };

  return {
    data,
    isLoading,
    error,
    create,
    update,
    remove,
  };
}