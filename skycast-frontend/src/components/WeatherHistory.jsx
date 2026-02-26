import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';

const CustomTooltip = ({ active, payload, getUnitSymbol }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-white/20 rounded-lg p-3 shadow-xl">
        <p className="text-white font-medium">
          {payload[0].payload.time}
        </p>
        <p className="text-sky-300 font-semibold">
          {payload[0].value}{getUnitSymbol()}
        </p>
      </div>
    );
  }
  return null;
};

export default function WeatherHistory({ forecast }) {
  const { convertTemp, getUnitSymbol } = useTemperatureUnit();

  if (!forecast || forecast.length === 0) return null;

  // Get today's hourly data from forecast (first 8 entries for today)
  const todayData = forecast[0]?.hourly || [];
  
  // If no hourly data, create mock data from daily forecast
  const chartData = todayData.length > 0 
    ? todayData.slice(0, 24).map(item => ({
        time: format(new Date(item.dt * 1000), 'ha'),
        temp: convertTemp(item.temp),
        hour: new Date(item.dt * 1000).getHours()
      }))
    : // Fallback: create data points from daily forecast
      forecast.slice(0, 5).map((day, index) => ({
        time: format(new Date(day.dt * 1000), 'EEE'),
        temp: convertTemp((day.temp_max + day.temp_min) / 2),
        hour: index * 6 // Spread across 24 hours
      }));

  if (chartData.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
      <div className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
          Temperature Trend
        </h3>
        
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip getUnitSymbol={getUnitSymbol} />} />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="#60A5FA" 
                strokeWidth={3}
                dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex items-center justify-center text-sm text-gray-400">
          <span>Showing temperature trend in {getUnitSymbol()}</span>
        </div>
      </div>
    </div>
  );
}
