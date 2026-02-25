import { useState } from 'react';
import { AlertTriangle, X, Wind, Droplets, Thermometer, Eye } from 'lucide-react';

const WeatherAlerts = ({ weatherData, onDismiss }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const generateWeatherAlerts = (data) => {
    const alertList = [];
    const { main, weather, wind, visibility } = data;

    // Temperature alerts
    if (main.temp > 35) {
      alertList.push({
        id: 'extreme-heat',
        type: 'warning',
        title: 'Extreme Heat Warning',
        message: `Temperature is ${Math.round(main.temp)}°C. Stay hydrated and avoid prolonged sun exposure.`,
        icon: Thermometer,
        color: 'text-red-400'
      });
    } else if (main.temp < 0) {
      alertList.push({
        id: 'freezing',
        type: 'info',
        title: 'Freezing Conditions',
        message: `Temperature is ${Math.round(main.temp)}°C. Be cautious of ice on roads.`,
        icon: Thermometer,
        color: 'text-blue-400'
      });
    }

    // Wind alerts
    if (wind.speed > 10) {
      alertList.push({
        id: 'strong-wind',
        type: 'warning',
        title: 'Strong Wind Advisory',
        message: `Wind speed is ${wind.speed} m/s. Secure loose objects outdoors.`,
        icon: Wind,
        color: 'text-yellow-400'
      });
    }

    // Humidity alerts
    if (main.humidity > 85) {
      alertList.push({
        id: 'high-humidity',
        type: 'info',
        title: 'High Humidity',
        message: `Humidity is ${main.humidity}%. May feel warmer than actual temperature.`,
        icon: Droplets,
        color: 'text-cyan-400'
      });
    }

    // Visibility alerts
    if (visibility && visibility < 1000) {
      alertList.push({
        id: 'low-visibility',
        type: 'warning',
        title: 'Low Visibility',
        message: `Visibility is reduced to ${visibility/1000}km. Drive with caution.`,
        icon: Eye,
        color: 'text-gray-400'
      });
    }

    // Weather condition alerts
    const condition = weather[0]?.main?.toLowerCase();
    if (condition?.includes('thunder') || condition?.includes('storm')) {
      alertList.push({
        id: 'thunderstorm',
        type: 'severe',
        title: 'Thunderstorm Warning',
        message: 'Seek shelter immediately. Avoid outdoor activities.',
        icon: AlertTriangle,
        color: 'text-purple-400'
      });
    }

    return alertList;
  };

  const alerts = weatherData ? generateWeatherAlerts(weatherData) : [];

  const handleDismiss = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    if (alerts.filter(a => !dismissedAlerts.has(a.id)).length === 1) {
      onDismiss?.();
    }
  };

  const activeAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id));

  if (activeAlerts.length === 0) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 space-y-2 max-w-2xl mx-auto">
      {activeAlerts.map((alert) => {
        const Icon = alert.icon;
        return (
          <div
            key={alert.id}
            className={`bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl animate-pulse ${
              alert.type === 'severe' ? 'border-red-500/50' : 
              alert.type === 'warning' ? 'border-yellow-500/50' : 
              'border-blue-500/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <Icon className={`mt-1 ${alert.color}`} size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{alert.title}</h4>
                <p className="text-gray-300 text-sm">{alert.message}</p>
              </div>
              <button
                onClick={() => handleDismiss(alert.id)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherAlerts;
