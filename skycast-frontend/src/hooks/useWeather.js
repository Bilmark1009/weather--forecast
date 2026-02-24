import { useState, useCallback } from 'react';
import { weatherService } from '../services/api';

export function useWeather() {
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = useCallback(async (city) => {
        setLoading(true);
        setError(null);
        try {
            const [currRes, foreRes] = await Promise.all([
                weatherService.getCurrent(city),
                weatherService.getForecast(city)
            ]);
            setCurrent(currRes.data);
            setForecast(foreRes.data.forecast);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to fetch weather data.');
            setCurrent(null);
            setForecast([]);
        } finally {
            setLoading(false);
        }
    }, []);

    return { current, forecast, loading, error, fetchWeather };
}
