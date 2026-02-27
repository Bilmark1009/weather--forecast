import { MapPin, Wind, Droplets, Thermometer, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import LazyImage from './LazyImage';
import SunriseSunset from './SunriseSunset';
import WindDirection from './WindDirection';
import UVIndex from './UVIndex';
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';

export default function CurrentWeather({ data }) {
    const { convertTemp, getUnitSymbol } = useTemperatureUnit();
    
    if (!data) return null;

    const { name, main, weather, wind, sys, dt } = data;
    const condition = weather[0];
    const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@4x.png`;

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 glass-card rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left side: City & Temp */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sky-300 mb-2">
                        <MapPin size={20} />
                        <h2 className="text-2xl font-semibold tracking-tight uppercase tracking-widest">{name}, {sys.country}</h2>
                    </div>
                    <div className="text-gray-300 text-sm mb-6 flex items-center justify-center md:justify-start gap-2">
                        <Calendar size={14} />
                        {format(new Date(dt * 1000), 'EEEE, MMMM do, yyyy')}
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <span className="text-8xl md:text-9xl font-bold tracking-tighter text-white">
                            {convertTemp(main.temp)}°
                        </span>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl text-gray-400">{getUnitSymbol().replace('°', '')}</span>
                            <div className="flex gap-2 text-sm">
                                <span className="text-orange-400 font-medium">H: {convertTemp(main.temp_max)}°</span>
                                <span className="text-blue-400 font-medium">L: {convertTemp(main.temp_min)}°</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-2xl md:text-3xl text-gray-200 mt-4 capitalize font-heading">
                        {condition.description}
                    </p>
                </div>

                {/* Center/Right: Icon */}
                <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-sky-400/20 blur-3xl rounded-full animate-pulse"></div>
                    <LazyImage
                        src={iconUrl}
                        alt={condition.description}
                        className="w-48 h-48 md:w-64 md:h-64 relative z-10 drop-shadow-2xl"
                    />
                </div>

                {/* Right side: Details */}
                <div className="space-y-4 w-full md:w-72">
                    <div className="grid grid-cols-2 gap-4">
                        <DetailCard icon={<Wind className="text-sky-400" />} label="Wind" value={`${wind.speed} m/s`} />
                        <DetailCard icon={<Droplets className="text-blue-400" />} label="Humidity" value={`${main.humidity}%`} />
                        <DetailCard icon={<Thermometer className="text-orange-400" />} label="Feels Like" value={`${convertTemp(main.feels_like)}°`} />
                        <DetailCard icon={<Calendar className="text-purple-400" />} label="Pressure" value={`${main.pressure} hPa`} />
                    </div>
                    
                    <WindDirection windSpeed={wind.speed} windDeg={wind.deg} />
                    <UVIndex uvi={data.uvi} />
                    <SunriseSunset sunrise={sys.sunrise} sunset={sys.sunset} />
                </div>
            </div>
        </div>
    );
}

function DetailCard({ icon, label, value }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all hover:bg-white/10">
            <div className="mb-2">{icon}</div>
            <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">{label}</span>
            <span className="text-white font-semibold">{value}</span>
        </div>
    );
}
