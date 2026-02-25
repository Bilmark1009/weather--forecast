const CACHE_KEY = 'skycast_weather_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cacheUtils = {
  get: (city) => {
    try {
      const cached = localStorage.getItem(`${CACHE_KEY}_${city.toLowerCase()}`);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;

      if (isExpired) {
        localStorage.removeItem(`${CACHE_KEY}_${city.toLowerCase()}`);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  },

  set: (city, data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`${CACHE_KEY}_${city.toLowerCase()}`, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Cache write error:', error);
    }
  },

  clear: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(CACHE_KEY)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
};
