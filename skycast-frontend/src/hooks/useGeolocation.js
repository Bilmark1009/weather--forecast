import { useState, useCallback } from 'react';

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(null);

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return Promise.reject(new Error('Geolocation not supported'));
    }

    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(false);
          setPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          resolve(position);
        },
        (error) => {
          setIsLoading(false);
          let errorMessage = 'Unable to retrieve your location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location permissions.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'An unknown error occurred.';
              break;
          }
          
          setError(errorMessage);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }, []);

  const reverseGeocode = async (lat, lon) => {
    try {
      // Using OpenWeatherMap's reverse geocoding API
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo';
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to reverse geocode location');
      }
      
      const data = await response.json();
      if (data && data.length > 0) {
        const location = data[0];
        return {
          city: location.name,
          country: location.country,
          state: location.state,
          displayName: `${location.name}${location.state ? ', ' + location.state : ''}, ${location.country}`
        };
      }
      
      return null;
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      return null;
    }
  };

  return {
    getCurrentPosition,
    reverseGeocode,
    isLoading,
    error,
    position,
    isSupported: !!navigator.geolocation,
  };
}
