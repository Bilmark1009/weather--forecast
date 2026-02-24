import { useState, useEffect, useCallback } from 'react';
import { favoriteService } from '../services/api';

export function useFavorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFavorites = useCallback(async () => {
        setLoading(true);
        try {
            const res = await favoriteService.getAll();
            setFavorites(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const toggleFavorite = async (city, countryCode) => {
        const existing = favorites.find(f => f.city.toLowerCase() === city.toLowerCase());

        try {
            if (existing) {
                await favoriteService.remove(existing.id);
                setFavorites(favorites.filter(f => f.id !== existing.id));
                return false; // Not favorite anymore
            } else {
                const res = await favoriteService.add(city, countryCode);
                setFavorites([res.data, ...favorites]);
                return true; // Now favorite
            }
        } catch (err) {
            console.error(err);
            return existing ? true : false;
        }
    };

    const isFavorite = (city) => {
        return favorites.some(f => f.city.toLowerCase() === city.toLowerCase());
    };

    return { favorites, loading, toggleFavorite, isFavorite, refreshFavorites: fetchFavorites };
}
