export function LoadingSkeleton() {
    return (
        <div className="w-full max-w-4xl mx-auto mt-8 p-12 glass rounded-3xl animate-pulse">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 space-y-4">
                    <div className="h-8 bg-white/10 rounded-lg w-1/2"></div>
                    <div className="h-24 bg-white/10 rounded-2xl w-3/4"></div>
                    <div className="h-6 bg-white/10 rounded-lg w-1/3"></div>
                </div>
                <div className="w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-full"></div>
                <div className="grid grid-cols-2 gap-4 w-full md:w-72">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-20 bg-white/5 rounded-2xl"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function ErrorMessage({ message }) {
    return (
        <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            </div>
            <p className="text-red-300 font-medium">{message || 'An unexpected error occurred. Please try again.'}</p>
        </div>
    );
}
