import { useEffect, useState } from 'react';

interface TimerProps {
  value: number;
  maxValue: number;
}

export function Timer({ value, maxValue }: TimerProps) {
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    setPercentage((value / maxValue) * 100);
  }, [value, maxValue]);

  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-1000 ${
          percentage > 60
            ? 'bg-green-500'
            : percentage > 30
            ? 'bg-yellow-500'
            : 'bg-red-500'
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}