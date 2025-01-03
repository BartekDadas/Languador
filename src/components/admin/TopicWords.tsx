import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { getWordsByTopic } from '../../services/wordService';
import type { Topic, Word } from '../../types/game';

interface TopicWordsProps {
  topic: Topic;
}

export function TopicWords({ topic }: TopicWordsProps) {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWords = async () => {
      setIsLoading(true);
      try {
        const topicWords = await getWordsByTopic(topic.id);
        setWords(topicWords);
      } catch (error) {
        console.error('Failed to load words:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWords();
  }, [topic.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No words added to this topic yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-gray-900 mb-4">
        Words in {topic.name}
      </h3>
      <div className="grid gap-3">
        {words.map((word) => (
          <div
            key={word.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-medium text-gray-900">{word.english}</p>
                <p className="text-gray-600 mt-1">{word.spanish}</p>
              </div>
              <span className="px-2 py-1 text-sm bg-gray-100 rounded">
                Level {word.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}