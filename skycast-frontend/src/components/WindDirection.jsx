import { Compass } from 'lucide-react';

export default function WindDirection({ windSpeed, windDeg }) {
  if (!windSpeed || windDeg === undefined) return null;

  // Convert wind direction to cardinal direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const direction = getWindDirection(windDeg);
  const rotation = windDeg;

  return (
    <div className="glass-card border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all hover:bg-white/10">
      <div className="relative w-16 h-16 mb-3">
        <Compass 
          className="w-full h-full text-sky-400 transition-transform duration-500"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        {/* Direction indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-8 bg-red-500 rounded-full"></div>
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-gray-400 text-xs uppercase tracking-widest">Wind From</span>
        <span className="text-white font-bold text-lg">{direction}</span>
        <span className="text-sky-300 font-medium">{windSpeed} m/s</span>
      </div>
    </div>
  );
}
