import { useState, useEffect } from 'react';

export function useTemperatureUnit() {
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('skycast_temp_unit') || 'celsius';
  });

  useEffect(() => {
    localStorage.setItem('skycast_temp_unit', unit);
  }, [unit]);

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const convertTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const getUnitSymbol = () => {
    return unit === 'fahrenheit' ? '°F' : '°C';
  };

  return {
    unit,
    toggleUnit,
    convertTemp,
    getUnitSymbol,
    isCelsius: unit === 'celsius',
    isFahrenheit: unit === 'fahrenheit'
  };
}
