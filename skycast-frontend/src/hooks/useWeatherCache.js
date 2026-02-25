import { useState, useCallback } from 'react';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 50;

const useWeatherCache = () => {
  const [cache, setCache] = useState(new Map());

  const isExpired = (timestamp) => Date.now() - timestamp > CACHE_DURATION;

  const get = useCallback((key) => {
    const cached = cache.get(key);
    if (!cached || isExpired(cached.timestamp)) {
      cache.delete(key);
      return null;
    }
    return cached.data;
  }, [cache]);

  const set = useCallback((key, data) => {
    const newCache = new Map(cache);
    
    // Remove oldest entries if cache is too large
    if (newCache.size >= MAX_CACHE_SIZE) {
      const oldestKey = newCache.keys().next().value;
      newCache.delete(oldestKey);
    }
    
    newCache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    setCache(newCache);
  }, [cache]);

  const clear = useCallback(() => {
    setCache(new Map());
  }, []);

  const cleanup = useCallback(() => {
    const newCache = new Map();
    for (const [key, value] of cache.entries()) {
      if (!isExpired(value.timestamp)) {
        newCache.set(key, value);
      }
    }
    setCache(newCache);
  }, [cache]);

  return { get, set, clear, cleanup };
};

export default useWeatherCache;
