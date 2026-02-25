import { useState, useCallback, useEffect } from 'react';
import { weatherService } from '../services/api';
import useWeatherCache from './useWeatherCache';

export function useWeather() {
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { get, set, clear, cleanup } = useWeatherCache();

    // Cleanup expired cache entries periodically
    useEffect(() => {
        const interval = setInterval(cleanup, 60000); // Every minute
        return () => clearInterval(interval);
    }, [cleanup]);

    const fetchWeather = useCallback(async (city) => {
        setLoading(true);
        setError(null);

        // Check cache first
        const cachedData = get(city);
        if (cachedData) {
            setCurrent(cachedData.current);
            setForecast(cachedData.forecast);
            setLoading(false);
            return;
        }

        try {
            const [currRes, foreRes] = await Promise.all([
                weatherService.getCurrent(city),
                weatherService.getForecast(city)
            ]);
            
            const weatherData = {
                current: currRes.data,
                forecast: foreRes.data.forecast
            };

            // Store in cache
            set(city, weatherData);

            setCurrent(weatherData.current);
            setForecast(weatherData.forecast);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to fetch weather data.');
            setCurrent(null);
            setForecast([]);
        } finally {
            setLoading(false);
        }
    }, [get, set]);

    return { current, forecast, loading, error, fetchWeather, clearCache: clear };
}
