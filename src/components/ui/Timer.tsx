import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface TimerProps {
  duration: number;
  onComplete: () => void;
  className?: string;
}

export function Timer({ duration, onComplete, className }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className={clsx('w-full', className)}>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={clsx(
            'h-full transition-all duration-1000',
            {
              'bg-primary': percentage > 60,
              'bg-yellow-500': percentage <= 60 && percentage > 30,
              'bg-red-500': percentage <= 30,
            }
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}