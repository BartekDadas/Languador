interface ComboMeterProps {
  value: number;
}

export function ComboMeter({ value }: ComboMeterProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-300">Combo</span>
      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${Math.min(value * 20, 100)}%` }}
        />
      </div>
      <span className="text-sm font-bold text-white">x{value}</span>
    </div>
  );
}