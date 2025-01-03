import type { Word, Topic } from '../types/game';
import { MOCK_WORDS, MOCK_TOPICS } from '../data/mockWords';

export async function getTopics(): Promise<Topic[]> {
  return MOCK_TOPICS;
}

export async function getWordsByTopic(topicId: string): Promise<Word[]> {
  return MOCK_WORDS[topicId as keyof typeof MOCK_WORDS] || [];
}

export async function getRandomWords(topicId: string, count: number = 4): Promise<Word[]> {
  const words = MOCK_WORDS[topicId as keyof typeof MOCK_WORDS] || [];
  return words.sort(() => Math.random() - 0.5).slice(0, count);
}

export function generateOptions(words: Word[], correctWord: Word): string[] {
  const options = new Set([correctWord.spanish]);
  
  while (options.size < 4 && words.length > 0) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    if (randomWord.id !== correctWord.id) {
      options.add(randomWord.spanish);
    }
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5);
}