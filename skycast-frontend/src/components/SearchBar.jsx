import { useState } from 'react';
import { Search, MapPin, Star, Loader2, Clock, X, Navigation } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRecentSearches } from '../hooks/useRecentSearches';
import { useGeolocation } from '../hooks/useGeolocation';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function SearchBar({ onSearch, isLoading }) {
    const [query, setQuery] = useState('');
    const [showRecent, setShowRecent] = useState(false);
    const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearches();
    const { getCurrentPosition, reverseGeocode, isLoading: locationLoading, error: locationError, isSupported } = useGeolocation();

    const handleLocationSearch = async () => {
        try {
            const position = await getCurrentPosition();
            const location = await reverseGeocode(position.lat, position.lon);
            
            if (location && location.displayName) {
                addRecentSearch(location.displayName);
                onSearch(location.displayName);
                setShowRecent(false);
            }
        } catch (error) {
            console.error('Location search error:', error);
            if (locationError) {
                console.error('Geolocation error:', locationError);
            }
            // You could show a toast notification here
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            addRecentSearch(query.trim());
            onSearch(query.trim());
            setShowRecent(false);
        }
    };

    const handleRecentClick = (city) => {
        setQuery(city);
        addRecentSearch(city);
        onSearch(city);
        setShowRecent(false);
    };

    const handleClearRecent = (e, city) => {
        e.stopPropagation();
        removeRecentSearch(city);
    };

    const handleClearAll = (e) => {
        e.stopPropagation();
        clearRecentSearches();
    };

    // Show recent searches when input is focused and empty
    const handleFocus = () => {
        if (!query && recentSearches.length > 0) {
            setShowRecent(true);
        }
    };

    const handleBlur = () => {
        // Delay hiding to allow click on recent items
        setTimeout(() => setShowRecent(false), 200);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value) {
            setShowRecent(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-sky-400 transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Search for a city (e.g. Tokyo, London)..."
                    className={cn(
                        "block w-full pl-12 pr-24 py-4 glass-card border border-white/20 rounded-2xl shadow-xl",
                        "text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:bg-white/20",
                        "backdrop-blur-md transition-all duration-300 hover:border-white/30",
                        isLoading && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isLoading}
                />
                <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2">
                    {isSupported && (
                        <button
                            type="button"
                            onClick={handleLocationSearch}
                            disabled={locationLoading || isLoading}
                            className={cn(
                                "p-2.5 glass-card border border-white/20 rounded-xl",
                                "text-white/70 hover:text-white hover:bg-white/10 transition-all",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                                locationLoading && "animate-pulse"
                            )}
                            title="Use my current location"
                        >
                            {locationLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Navigation className="h-4 w-4" />
                            )}
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading || !query.trim()}
                        className={cn(
                            "px-6 py-2.5 btn-primary rounded-xl",
                            "text-white font-medium shadow-lg transition-all active:scale-95 disabled:opacity-50",
                            "disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2"
                        )}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            'Search'
                        )}
                    </button>
                </div>
            </form>

            {/* Recent Searches Dropdown */}
            {showRecent && recentSearches.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card border border-white/20 rounded-2xl shadow-2xl z-50">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <Clock size={16} />
                                Recent Searches
                            </div>
                            <button
                                onClick={handleClearAll}
                                className="text-xs text-gray-400 hover:text-white transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="space-y-1">
                            {recentSearches.map((city, index) => (
                                <div
                                    key={`${city}-${index}`}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                                    onClick={() => handleRecentClick(city)}
                                >
                                    <div className="flex items-center gap-2 flex-1">
                                        <MapPin size={14} className="text-gray-400" />
                                        <span className="text-white text-sm">{city}</span>
                                    </div>
                                    <button
                                        onClick={(e) => handleClearRecent(e, city)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                                    >
                                        <X size={14} className="text-gray-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
