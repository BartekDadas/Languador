import type { Topic } from '../types/game';
import { MOCK_TOPICS, MOCK_WORDS } from '../data/mockWords';

export async function addTopic(topic: Omit<Topic, 'id'>): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = `topic-${Date.now()}`;
  MOCK_TOPICS.push({
    ...topic,
    id,
  });
  
  return id;
}

export async function updateTopic(topicId: string, updates: Partial<Topic>): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = MOCK_TOPICS.findIndex(t => t.id === topicId);
  if (index !== -1) {
    MOCK_TOPICS[index] = {
      ...MOCK_TOPICS[index],
      ...updates,
    };
  }
}

export async function addWordToTopic(topicId: string, word: { english: string; spanish: string; difficulty: number }): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = `word-${Date.now()}`;
  const topicWords = MOCK_WORDS[topicId as keyof typeof MOCK_WORDS] || [];
  
  if (Array.isArray(topicWords)) {
    topicWords.push({
      ...word,
      id,
      topicId,
    });
  }
  
  return id;
}