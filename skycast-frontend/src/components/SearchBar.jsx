import { useState } from 'react';
import { Search, MapPin, Star, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function SearchBar({ onSearch, isLoading }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-sky-400 transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a city (e.g. Tokyo, London)..."
                    className={cn(
                        "block w-full pl-12 pr-4 py-4 glass-card border border-white/20 rounded-2xl shadow-xl",
                        "text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:bg-white/20",
                        "backdrop-blur-md transition-all duration-300 hover:border-white/30",
                        isLoading && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className={cn(
                        "absolute right-2.5 bottom-2.5 px-6 py-1.5 btn-primary rounded-xl",
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
            </form>
        </div>
    );
}
