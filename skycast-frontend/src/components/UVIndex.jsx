import { Sun } from 'lucide-react';

export default function UVIndex({ uvi }) {
  if (uvi === undefined || uvi === null) return null;

  const getUVLevel = (index) => {
    if (index <= 2) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-400/20' };
    if (index <= 5) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
    if (index <= 7) return { level: 'High', color: 'text-orange-400', bg: 'bg-orange-400/20' };
    if (index <= 10) return { level: 'Very High', color: 'text-red-400', bg: 'bg-red-400/20' };
    return { level: 'Extreme', color: 'text-purple-400', bg: 'bg-purple-400/20' };
  };

  const getUVAdvice = (index) => {
    if (index <= 2) return 'No protection needed';
    if (index <= 5) return 'Wear sunglasses and SPF 30+';
    if (index <= 7) return 'Seek shade during midday hours';
    if (index <= 10) return 'Extra protection required';
    return 'Avoid sun exposure, stay indoors';
  };

  const uvInfo = getUVLevel(uvi);
  const advice = getUVAdvice(uvi);

  return (
    <div className={`glass-card border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/10 ${uvInfo.bg}`}>
      <div className="flex items-center gap-3 mb-3">
        <Sun className={`${uvInfo.color}`} size={24} />
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-widest">UV Index</span>
          <div className="flex items-baseline gap-1">
            <span className="text-white font-bold text-2xl">{uvi.toFixed(1)}</span>
            <span className={`${uvInfo.color} font-medium`}>{uvInfo.level}</span>
          </div>
        </div>
      </div>
      <div className="text-gray-300 text-sm">
        {advice}
      </div>
    </div>
  );
}
