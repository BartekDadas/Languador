import { useState } from 'react';
import { Send } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Learning Tips
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly Spanish learning tips, updates, and exclusive content.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition disabled:opacity-50"
              >
                {status === 'loading' ? (
                  'Subscribing...'
                ) : (
                  <>
                    Subscribe
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
            {status === 'success' && (
              <p className="mt-4 text-sm text-blue-100">
                Thanks for subscribing! Check your email for confirmation.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}