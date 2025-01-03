import { Book } from 'lucide-react';

export function LessonsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lesson Management</h1>
      </div>
      
      <div className="text-center py-12">
        <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          Lesson Management Coming Soon
        </h2>
        <p className="text-gray-500">
          This feature is currently under development.
        </p>
      </div>
    </div>
  );
}