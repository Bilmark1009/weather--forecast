import { useState, useEffect } from 'react';

const MAX_RECENT_SEARCHES = 8;
const STORAGE_KEY = 'skycast_recent_searches';

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [recentSearches]);

  const addRecentSearch = (city) => {
    if (!city || typeof city !== 'string') return;
    
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    setRecentSearches(prev => {
      // Remove if already exists
      const filtered = prev.filter(search => 
        search.toLowerCase() !== trimmedCity.toLowerCase()
      );
      
      // Add to beginning
      const updated = [trimmedCity, ...filtered];
      
      // Keep only the most recent searches
      return updated.slice(0, MAX_RECENT_SEARCHES);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeRecentSearch = (cityToRemove) => {
    setRecentSearches(prev => 
      prev.filter(search => search !== cityToRemove)
    );
  };

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    removeRecentSearch,
  };
}
