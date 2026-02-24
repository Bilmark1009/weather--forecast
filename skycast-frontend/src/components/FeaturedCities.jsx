import { useEffect, useState } from 'react';
import { cityService } from '../services/api';
import { MapPin, ArrowRight } from 'lucide-react';

export default function FeaturedCities({ onSelectCity }) {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cityService.getFeatured()
            .then(res => setCities(res.data))
            .catch(err => console.error('Failed to fetch featured cities', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null; // Or skeleton

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 px-4">
            <h3 className="text-xl font-medium text-gray-300 mb-6 flex items-center gap-2">
                Popular Cities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cities.map(city => (
                    <button
                        key={city.id}
                        onClick={() => onSelectCity(city.city)}
                        className="glass-dark group relative p-6 rounded-2xl text-left transition-all hover:bg-white/10 hover:border-sky-500/50 hover:scale-[1.02] flex items-center justify-between overflow-hidden"
                    >
                        <div className="relative z-10">
                            <span className="text-xs text-sky-400 font-bold uppercase tracking-widest">{city.country_code}</span>
                            <h4 className="text-xl font-bold text-white mt-1">{city.city}</h4>
                        </div>
                        <ArrowRight className="text-gray-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" size={24} />
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <MapPin size={100} />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
