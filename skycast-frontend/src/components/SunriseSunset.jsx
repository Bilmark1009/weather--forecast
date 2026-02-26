import { Sunrise, Sunset, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function SunriseSunset({ sunrise, sunset }) {
  if (!sunrise || !sunset) return null;

  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);
  const now = new Date();
  const isDaytime = now >= sunriseTime && now <= sunsetTime;

  return (
    <div className="space-y-4">
      {/* Current time indicator */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-center text-center transition-all">
        <Clock className={`mr-2 ${isDaytime ? 'text-yellow-400' : 'text-blue-400'}`} size={20} />
        <span className="text-white font-medium">
          {format(now, 'h:mm a')} - {isDaytime ? 'Daytime' : 'Nighttime'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all hover:bg-white/10">
          <div className="mb-2">
            <Sunrise className="text-orange-400" size={24} />
          </div>
          <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">Sunrise</span>
          <span className="text-white font-semibold text-lg">
            {format(sunriseTime, 'h:mm a')}
          </span>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all hover:bg-white/10">
          <div className="mb-2">
            <Sunset className="text-purple-400" size={24} />
          </div>
          <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">Sunset</span>
          <span className="text-white font-semibold text-lg">
            {format(sunsetTime, 'h:mm a')}
          </span>
        </div>
      </div>
    </div>
  );
}
