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
    
    console.log('Searching for location:', location);
    
    // Dispatch function with SET_LOADING Action call
    dispatch({ type: 'SET_LOADING' });
    
    try {
      // Fetch to the Geocoding API
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
      const data = await response.json();
      
      // Check if a city was found
      if (!data.results || data.results.length === 0) {
        throw new Error('City not found');
      }
      
      // Extract properties from the first fetch
      const { latitude, longitude, name } = data.results[0];
      
      // Send city name as SET_CITY Action
      dispatch({ 
        type: 'SET_CITY', 
        payload: name 
      });
      
      // Second fetch for weather data with the correct parameters
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,visibility,uv_index&timezone=auto`
      );
      const weatherData = await weatherResponse.json();
      
      console.log('Weather data received:', weatherData);
      
      // Extract current data and store in a suitable format
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
      
      // Send weather data as SET_WEATHER Action
      dispatch({ 
        type: 'SET_WEATHER', 
        payload: processedWeather 
      });
      
    } catch (error) {
      // Catch error in catch block and call dispatch
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
          <label htmlFor={inputId} className="search-label">Search location:</label>
          <input
            id={inputId}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location..."
            className="search-input"
            disabled={state.loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={state.loading || !location.trim()}
          >
            {state.loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="search-suggestions">
        <span className="suggestions-label">Popular Cities:</span>
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