import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar.jsx';
import GameCard from './components/GameCard.jsx';

// API URL - switches between local and production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames(searchQuery);
  }, [searchQuery]);

  const fetchGames = async (query) => {
    setLoading(true);
    try {
      const url = query 
        ? `${API_URL}/list?search=${encodeURIComponent(query)}`
        : `${API_URL}/list`;
      
      const response = await fetch(url);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="logo-icon">
              <span className="logo-color-1">●</span>
              <span className="logo-color-2">●</span>
              <span className="logo-color-3">●</span>
            </div>
            <span className="logo-text">ameba</span>
          </div>
          
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
          
          <div className="header-actions">
            <div className="language-selector">
              🏳️ English EU | EUR
            </div>
            <div className="icons">
              <span className="icon">♡</span>
              <span className="icon">🛒</span>
              <span className="icon">👤</span>
            </div>
          </div>
        </div>
        
        <div className="subtitle">
          🎮 Games, Gift Cards, Top-Ups & More | Best Deals
        </div>
      </header>

      <main className="main-content">
        <div className="results-header">
          <h2>Results found: {games.length}</h2>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="games-grid">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}

        {!loading && games.length === 0 && (
          <div className="no-results">
            No games found. Try a different search term.
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
