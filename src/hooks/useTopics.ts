import { useState, useEffect, useCallback } from 'react';
import { getTopics } from '../services/wordService';
import type { Topic } from '../types/game';

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedTopics = await getTopics();
      setTopics(fetchedTopics);
      setError(null);
    } catch (error) {
      setError('Failed to load topics');
      console.error('Error loading topics:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  return {
    topics,
    isLoading,
    error,
    refetch: fetchTopics,
  };
}