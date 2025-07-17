import { useState, useId } from 'react';
import { useWeather } from '../context/WeatherContext';
import './SearchBar.css';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const inputId = useId();
  const { state, dispatch } = useWeather();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!location.trim()) return;
    
    console.log('Suche nach Ort:', location);
    
    // Dispatch-Funktion mit SET_LOADING Action aufrufen
    dispatch({ type: 'SET_LOADING' });
    
    try {
      // Fetch auf die Geocoding API
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
      const data = await response.json();
      
      // Überprüfen ob eine Stadt gefunden wurde
      if (!data.results || data.results.length === 0) {
        throw new Error('Stadt wurde nicht gefunden');
      }
      
      // Eigenschaften aus dem ersten Fetch extrahieren
      const { latitude, longitude, name } = data.results[0];
      
      // Stadt-Name als SET_CITY Action senden
      dispatch({ 
        type: 'SET_CITY', 
        payload: name 
      });
      
      // Zweiter Fetch für Wetterdaten mit den richtigen Parametern
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,visibility,uv_index&timezone=auto`
      );
      const weatherData = await weatherResponse.json();
      
      console.log('Wetterdaten erhalten:', weatherData);
      
      // Die current-Daten extrahieren und in einem passenden Format speichern
      const processedWeather = {
        temperature_2m: weatherData.current.temperature_2m,
        apparent_temperature: weatherData.current.apparent_temperature,
        relative_humidity_2m: weatherData.current.relative_humidity_2m,
        surface_pressure: weatherData.current.surface_pressure,
        wind_speed_10m: weatherData.current.wind_speed_10m,
        wind_direction_10m: weatherData.current.wind_direction_10m,
        visibility: weatherData.current.visibility,
        uv_index: weatherData.current.uv_index,
        weathercode: weatherData.current.weather_code
      };
      
      // Wetterdaten als SET_WEATHER Action senden
      dispatch({ 
        type: 'SET_WEATHER', 
        payload: processedWeather 
      });
      
    } catch (error) {
      // Fehler im catch-Block abfangen und dispatch aufrufen
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.message 
      });
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <label htmlFor={inputId} className="search-label">Standort suchen:</label>
          <input
            id={inputId}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ort eingeben..."
            className="search-input"
            disabled={state.loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={state.loading || !location.trim()}
          >
            {state.loading ? 'Suchen...' : 'Suchen'}
          </button>
        </div>
      </form>
      
      <div className="search-suggestions">
        <span className="suggestions-label">Beliebte Städte:</span>
        <button 
          onClick={() => setLocation('Berlin')}
          className="suggestion-btn"
          disabled={state.loading}
        >
          Berlin
        </button>
        <button 
          onClick={() => setLocation('Tokyo')}
          className="suggestion-btn"
          disabled={state.loading}
        >
          Tokyo
        </button>
        <button 
          onClick={() => setLocation('Las Palmas')}
          className="suggestion-btn"
          disabled={state.loading}
        >
          Las Palmas
        </button>
        <button 
          onClick={() => setLocation('Stockholm')}
          className="suggestion-btn"
          disabled={state.loading}
        >
          Stockholm
        </button>
      </div>
    </div>
  );
};

export default SearchBar;