import { Eye, Cloud } from 'lucide-react';

export default function Visibility({ visibility }) {
  if (visibility === undefined || visibility === null) return null;

  // Convert visibility from meters to kilometers
  const visibilityKm = (visibility / 1000).toFixed(1);
  
  const getVisibilityLevel = (km) => {
    if (km >= 10) return { level: 'Excellent', color: 'text-green-400', icon: Eye };
    if (km >= 5) return { level: 'Good', color: 'text-blue-400', icon: Eye };
    if (km >= 2) return { level: 'Moderate', color: 'text-yellow-400', icon: Cloud };
    if (km >= 1) return { level: 'Poor', color: 'text-orange-400', icon: Cloud };
    return { level: 'Very Poor', color: 'text-red-400', icon: Cloud };
  };

  const visibilityInfo = getVisibilityLevel(visibilityKm);
  const Icon = visibilityInfo.icon;

  return (
    <div className="glass-card border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all hover:bg-white/10">
      <div className="mb-3">
        <Icon className={`${visibilityInfo.color}`} size={24} />
      </div>
      <div className="space-y-1">
        <span className="text-gray-400 text-xs uppercase tracking-widest">Visibility</span>
        <span className="text-white font-bold text-lg">{visibilityKm} km</span>
        <span className={`${visibilityInfo.color} font-medium text-sm`}>{visibilityInfo.level}</span>
      </div>
    </div>
  );
}
