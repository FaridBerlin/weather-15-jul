import './App.css';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🌤️ Wetter App</h1>
        <p className="app-subtitle">Lokale Wetterinformationen in Echtzeit</p>
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

