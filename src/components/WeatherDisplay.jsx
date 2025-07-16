import { useWeather } from '../context/WeatherContext';
import { weatherCode } from '../utils/weatherCode';
import './WeatherDisplay.css';

const WeatherDisplay = () => {
  const { state } = useWeather();

  // Funktion zur Temperaturkonvertierung
  const convertTemp = (temp) => {
    if (state.unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  if (state.loading) {
    return (
      <div className="weather-display">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Wetterdaten werden geladen...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="weather-display">
        <div className="error">
          <p>Fehler: {state.error}</p>
        </div>
      </div>
    );
  }

  if (!state.weather) {
    return null;
  }

  const weather = state.weather;
  const condition = weatherCode[weather.weathercode] || 'Unbekannt';
  const conditionParts = condition.split(' ');
  const emoji = conditionParts[0];
  const description = conditionParts.slice(1).join(' ');

  return (
    <div className="weather-display">
      <div className="weather-card">
        <div className="weather-header">
          <h2 className="city-name">{state.city}</h2>
          <p className="weather-condition">
            <span className="weather-emoji">{emoji}</span>
            {description}
          </p>
        </div>
        
        <div className="weather-body">
          <div className="temperature-section">
            <h1 className="current-temp">
              {convertTemp(weather.temperature_2m)}°{state.units[state.unit]}
            </h1>
            <p className="feels-like">
              Gefühlt wie {convertTemp(weather.apparent_temperature)}°{state.units[state.unit]}
            </p>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <div className="detail-label">Luftfeuchtigkeit</div>
              <div className="detail-value">{weather.relative_humidity_2m}%</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Luftdruck</div>
              <div className="detail-value">{weather.surface_pressure} hPa</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Sichtweite</div>
              <div className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">UV-Index</div>
              <div className="detail-value">{weather.uv_index}</div>
            </div>
          </div>

          <div className="wind-section">
            <h3 className="wind-title">Wind</h3>
            <div className="wind-details">
              <span className="wind-speed">{weather.wind_speed_10m} km/h</span>
              <span className="wind-direction">aus {weather.wind_direction_10m}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;