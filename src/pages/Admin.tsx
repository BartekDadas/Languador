import { useState } from 'react';
import { Plus, Save, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { TopicWords } from '../components/admin/TopicWords';
import { useTopics } from '../hooks/useTopics';
import { addTopic, addWordToTopic } from '../services/adminService';
import { PageLayout } from '../components/layout/PageLayout';
import type { Topic } from '../types/game';

export function Admin() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTopic, setNewTopic] = useState({
    name: '',
    description: '',
    difficulty: 1,
  });
  const [newWord, setNewWord] = useState({
    english: '',
    spanish: '',
    difficulty: 1,
  });

  const { topics, isLoading, refetch } = useTopics();

  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addTopic(newTopic);
      setNewTopic({ name: '', description: '', difficulty: 1 });
      setShowTopicForm(false);
      await refetch();
      setSuccess('Topic added successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add topic');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic) {
      setError('Please select a topic first');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addWordToTopic(selectedTopic.id, newWord);
      setNewWord({ english: '', spanish: '', difficulty: 1 });
      setSuccess('Word added successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add word');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Topics Management */}
          <Card className="h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Topics</h2>
              <Button
                onClick={() => setShowTopicForm(!showTopicForm)}
                disabled={isSubmitting}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Topic
              </Button>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md">
                {success}
              </div>
            )}

            {showTopicForm && (
              <form onSubmit={handleAddTopic} className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">New Topic</h3>
                <div className="space-y-4">
                  <Input
                    label="Topic Name"
                    value={newTopic.name}
                    onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                  <Input
                    label="Description"
                    value={newTopic.description}
                    onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                  <Input
                    type="number"
                    label="Difficulty (1-5)"
                    min="1"
                    max="5"
                    value={newTopic.difficulty}
                    onChange={(e) => setNewTopic({ ...newTopic, difficulty: Number(e.target.value) })}
                    required
                    disabled={isSubmitting}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Topic
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {isLoading ? (
              <div className="text-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="space-y-3">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full p-4 text-left border rounded-lg transition ${
                      selectedTopic?.id === topic.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{topic.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{topic.description}</p>
                      </div>
                      <span className="px-2 py-1 text-sm bg-gray-100 rounded">
                        Level {topic.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Words Management */}
          <Card className="h-fit">
            {selectedTopic ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Words</h2>
                  <p className="text-gray-600 mt-1">
                    Managing words for: {selectedTopic.name}
                  </p>
                </div>

                <form onSubmit={handleAddWord} className="space-y-4 mb-8">
                  <Input
                    label="English Word"
                    value={newWord.english}
                    onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                  <Input
                    label="Spanish Translation"
                    value={newWord.spanish}
                    onChange={(e) => setNewWord({ ...newWord, spanish: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                  <Input
                    type="number"
                    label="Difficulty (1-5)"
                    min="1"
                    max="5"
                    value={newWord.difficulty}
                    onChange={(e) => setNewWord({ ...newWord, difficulty: Number(e.target.value) })}
                    required
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Adding Word...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Word
                      </>
                    )}
                  </Button>
                </form>

                <TopicWords topic={selectedTopic} />
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Select a topic to manage its words
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}