import { Cloud, CloudRain, CloudSnow, Sun, Moon, Zap } from 'lucide-react';

export default function WeatherAnimations({ condition }) {
  if (!condition) return null;

  const weatherType = condition.toLowerCase();

  const renderRainAnimation = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            animation: `fall ${3 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.3 + Math.random() * 0.4
          }}
        >
          <div className="w-0.5 h-4 bg-blue-400 rounded-full"></div>
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );

  const renderSnowAnimation = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-spin"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            animation: `fall ${5 + Math.random() * 3}s linear infinite`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.6 + Math.random() * 0.4
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );

  const renderCloudAnimation = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-20"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 30}%`,
            animation: `float ${20 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          <Cloud className="w-16 h-16 text-white/30" />
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(20px) translateY(-10px); }
          50% { transform: translateX(-10px) translateY(5px); }
          75% { transform: translateX(15px) translateY(-5px); }
        }
      `}</style>
    </div>
  );

  const renderLightningAnimation = () => (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div
        className="absolute opacity-0"
        style={{
          left: `${20 + Math.random() * 60}%`,
          top: `${10 + Math.random() * 40}%`,
          animation: `lightning ${3 + Math.random() * 4}s ease-in-out infinite`
        }}
      >
        <Zap className="w-8 h-8 text-yellow-300" />
      </div>
      <style jsx>{`
        @keyframes lightning {
          0%, 90%, 100% { opacity: 0; }
          5%, 10% { opacity: 1; }
        }
      `}</style>
    </div>
  );

  // Return appropriate animation based on weather condition
  if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
    return renderRainAnimation();
  }
  
  if (weatherType.includes('snow')) {
    return renderSnowAnimation();
  }
  
  if (weatherType.includes('thunder') || weatherType.includes('storm')) {
    return renderLightningAnimation();
  }
  
  if (weatherType.includes('cloud')) {
    return renderCloudAnimation();
  }

  return null;
}
