import { createContext, useContext, useReducer } from 'react';

// Initialer State
const initialState = {
  loading: false,
  error: null,
  city: "",
  weather: null,
  unit: "celsius",
  units: {
    celsius: "C",
    fahrenheit: "F"
  }
};

// Reducer-Funktion
const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload
      };
    case 'SET_WEATHER':
      return {
        ...state,
        loading: false,
        weather: action.payload,
        error: null
      };
    case 'TOGGLE_UNITS':
      return {
        ...state,
        unit: state.unit === "celsius" ? "fahrenheit" : "celsius"
      };
    default:
      return state;
  }
};

// Create Context
const WeatherContext = createContext();

// Provider Component
export const WeatherProvider = ({ children }) => {
  // useReducer with initialState
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

// Custom Hook for easier usage
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export default WeatherContext;