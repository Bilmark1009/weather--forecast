import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastRow from './components/ForecastRow';
import WeatherHistory from './components/WeatherHistory';
import FeaturedCities from './components/FeaturedCities';
import FavoritesSidebar from './components/FavoritesSidebar';
import FeedbackModal from './components/FeedbackModal';
import WeatherAlerts from './components/WeatherAlerts';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingSkeleton, ErrorMessage } from './components/States';
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';
import { useTemperatureUnit } from './hooks/useTemperatureUnit';
import { useGeolocation } from './hooks/useGeolocation';
import { Star, MessageSquare, Thermometer } from 'lucide-react';

function App() {
  const { current, forecast, loading, error, fetchWeather } = useWeather();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleUnit, getUnitSymbol } = useTemperatureUnit();
  const { getCurrentPosition, reverseGeocode } = useGeolocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);

  // Initialize with geolocation or fallback to London
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const position = await getCurrentPosition();
        const location = await reverseGeocode(position.lat, position.lon);
        
        if (location && location.displayName) {
          fetchWeather(location.displayName);
        } else {
          fetchWeather('London');
        }
      } catch (error) {
        // Fallback to London if geolocation fails
        console.log('Geolocation initialization failed:', error);
        fetchWeather('London');
      }
    };

    initializeLocation();
  }, [fetchWeather, getCurrentPosition, reverseGeocode]);

  const handleFavoriteClick = async () => {
    if (current) {
      await toggleFavorite(current.name, current.sys.country);
    }
  };

  const bgClass = getBackgroundClass(current?.weather[0]?.main);

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-1000 ${bgClass} text-white selection:bg-sky-500/30`}>
      {/* Navigation / Header */}
      <header className="p-4 md:p-8 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <span className="text-2xl font-black italic">S</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight hidden sm:block">SkyCast</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleUnit}
            className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-all text-gray-300 hover:text-white"
            title="Toggle temperature unit"
          >
            <Thermometer size={20} />
            <span className="hidden md:inline font-medium">{getUnitSymbol()}</span>
          </button>
          <button
            onClick={() => setFeedbackOpen(true)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-all text-gray-300 hover:text-white"
          >
            <MessageSquare size={20} />
            <span className="hidden md:inline font-medium">Feedback</span>
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all shadow-xl backdrop-blur-md"
          >
            <Star size={24} className="text-sky-400" />
          </button>
        </div>
      </header>

      <main className="px-4 pb-20 max-w-7xl mx-auto">
        <WeatherAlerts weatherData={current} />
        <div className="mt-8 mb-12">
          <SearchBar onSearch={fetchWeather} isLoading={loading} />
        </div>

        {loading && <LoadingSkeleton />}
        {error && <ErrorMessage message={error} />}

        {current && !loading && (
          <div className="relative">
            {/* Favorite toggle button floating on CurrentWeather */}
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-12 right-12 z-20 p-3 rounded-full transition-all hover:scale-110 active:scale-90 ${isFavorite(current.name)
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/40'
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              <Star size={24} fill={isFavorite(current.name) ? "currentColor" : "none"} />
            </button>

            <CurrentWeather data={current} />
            <ForecastRow forecast={forecast} />
            <WeatherHistory forecast={forecast} />
          </div>
        )}

        {/* Show featured cities if no active search or after a search as exploration */}
        <FeaturedCities onSelectCity={fetchWeather} />
      </main>

      <FavoritesSidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectCity={fetchWeather}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
        <p>© 2026 SkyCast Weather Application. Powered by OpenWeatherMap.</p>
      </footer>
    </div>
    </ErrorBoundary>
  );
}

function getBackgroundClass(condition) {
  const c = condition?.toLowerCase();
  if (!c) return 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900';

  // Enhanced weather-based backgrounds with better gradients
  if (c.includes('clear') || c.includes('sky')) {
    return 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600';
  }
  if (c.includes('cloud')) {
    return 'bg-gradient-to-br from-slate-400 via-gray-500 to-slate-600';
  }
  if (c.includes('rain') || c.includes('drizzle')) {
    return 'bg-gradient-to-br from-indigo-500 via-blue-600 to-slate-700';
  }
  if (c.includes('thunder') || c.includes('storm')) {
    return 'bg-gradient-to-br from-purple-900 via-indigo-900 to-black';
  }
  if (c.includes('snow')) {
    return 'bg-gradient-to-br from-blue-100 via-gray-200 to-slate-300';
  }
  if (c.includes('mist') || c.includes('fog')) {
    return 'bg-gradient-to-br from-gray-300 via-slate-400 to-gray-500';
  }
  if (c.includes('wind')) {
    return 'bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600';
  }

  return 'bg-gradient-to-br from-sky-900 via-slate-800 to-indigo-900';
}

export default App;
