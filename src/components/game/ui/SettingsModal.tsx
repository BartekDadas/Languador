import { X } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  onFinishGame: () => void;
}

export function SettingsModal({ onClose, onFinishGame }: SettingsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Game Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={onFinishGame}
            className="w-full px-4 py-3 text-left bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center justify-between"
          >
            <span>Finish Game</span>
            <span className="text-sm opacity-75">End current session</span>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
}