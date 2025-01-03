interface HealthBarProps {
  value: number;
  maxValue: number;
}

export function HealthBar({ value, maxValue }: HealthBarProps) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-500 ${
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