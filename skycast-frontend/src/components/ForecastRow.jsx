import { format } from 'date-fns';

export default function ForecastRow({ forecast }) {
    if (!forecast || forecast.length === 0) return null;

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <h3 className="text-2xl font-semibold text-white mb-6 px-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
                5-Day Forecast
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-2">
                {forecast.map((day, idx) => (
                    <ForecastCard key={day.date} day={day} index={idx} />
                ))}
            </div>
        </div>
    );
}

function ForecastCard({ day, index }) {
    const date = new Date(day.dt * 1000);
    const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

    return (
        <div
            className="glass rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:scale-105 hover:bg-white/15"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <span className="text-gray-400 text-sm font-medium uppercase mb-4">
                {index === 0 ? 'Today' : format(date, 'EEE')}
            </span>
            <img src={iconUrl} alt={day.description} className="w-16 h-16 mb-4 drop-shadow-lg" />
            <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white leading-none">
                    {Math.round(day.temp_max)}°
                </span>
                <span className="text-sm text-gray-400">
                    {Math.round(day.temp_min)}°
                </span>
            </div>
            <span className="mt-4 text-xs text-sky-300 font-medium capitalize truncate w-full">
                {day.main}
            </span>
        </div>
    );
}
