import { useState, useEffect } from 'react';
import { X, Star, Trash2, MapPin } from 'lucide-react';
import { favoriteService } from '../services/api';

export default function FavoritesSidebar({ isOpen, onClose, onSelectCity }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const res = await favoriteService.getAll();
            setFavorites(res.data);
        } catch (err) {
            console.error('Failed to fetch favorites', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) fetchFavorites();
    }, [isOpen]);

    const removeFavorite = async (e, id) => {
        e.stopPropagation();
        try {
            await favoriteService.remove(id);
            setFavorites(favorites.filter(f => f.id !== id));
        } catch (err) {
            console.error('Failed to remove favorite', err);
        }
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed right-0 top-0 h-full w-full sm:w-80 bg-[#1a1c1e] z-50 shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} border-l border-white/5`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Star className="text-sky-400 fill-sky-400" size={24} />
                            Saved Cities
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                        {loading ? (
                            <div className="text-gray-500 text-center mt-20">Loading...</div>
                        ) : favorites.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
                                <Star size={48} className="text-gray-700 mb-4" />
                                <p className="text-gray-400">You haven't saved any cities yet.</p>
                            </div>
                        ) : (
                            favorites.map(fav => (
                                <div
                                    key={fav.id}
                                    onClick={() => { onSelectCity(fav.city); onClose(); }}
                                    className="group bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/10 hover:border-sky-500/30 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center text-sky-400">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">{fav.city}</h4>
                                            <span className="text-xs text-gray-500 uppercase tracking-tighter">{fav.country_code}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => removeFavorite(e, fav.id)}
                                        className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
