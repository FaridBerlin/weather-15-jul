import './App.css';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🌤️Farid Weather App</h1>
        <p className="app-subtitle">Real-time local weather information</p>
      </header>
      
      <main className="app-content">
        <SearchBar />
        <UnitToggle />
        <WeatherDisplay />
      </main>
    </div>
  )
}

export default App

