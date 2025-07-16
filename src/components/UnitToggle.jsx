import { useWeather } from '../context/WeatherContext';
import './UnitToggle.css';

const UnitToggle = () => {
  const { state, dispatch } = useWeather();

  const handleToggleUnits = () => {
    dispatch({ type: 'TOGGLE_UNITS' });
  };

  return (
    <div className="unit-toggle">
      <button 
        className="toggle-button"
        onClick={handleToggleUnits}
        type="button"
      >
        Anzeigen in {state.unit === 'celsius' ? '°F' : '°C'}
      </button>
    </div>
  );
};

export default UnitToggle;