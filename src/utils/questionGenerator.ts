import { nanoid } from 'nanoid';
import type { Question, Word, Topic } from '../types/game';
import { getRandomWords, generateOptions } from '../services/wordService';

export async function generateQuestion(topic: Topic): Promise<Question> {
  const words = await getRandomWords(topic.id, 4);
  const word = words[0]; // Use the first word as the correct answer
  const options = generateOptions(words, word);

  return {
    id: nanoid(),
    text: word.english,
    prompt: 'What\'s the Spanish word for',
    answer: word.spanish,
    difficulty: word.difficulty,
    options,
  };
}

export async function getNextQuestion(topic: Topic): Promise<Question> {
  return generateQuestion(topic);
}