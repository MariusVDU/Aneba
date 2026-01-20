import React from 'react';
import './GameCard.css';

function GameCard({ game }) {
  const getPlatformIcon = (platform) => {
    const icons = {
      'EA App': '🎮',
      'Xbox Live': '🎮',
      'Nintendo': '🎮',
      'PlayStation': '🎮',
      'Steam': '🎮',
      'Rockstar': '⭐'
    };
    return icons[platform] || '🎮';
  };

  return (
    <div className="game-card">
      <div className="card-image">
        <div className="cashback-badge">
          💰 CASHBACK
        </div>
        <div className="image-placeholder" style={{
          backgroundImage: `url(${game.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="image-overlay"></div>
        </div>
        <div className="platform-badge">
          {getPlatformIcon(game.platform)} {game.platform}
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="game-title">{game.title}</h3>
        <div className="region-tag">{game.region}</div>
        
        <div className="price-section">
          <div className="price-row">
            <span className="original-price">€{game.original_price.toFixed(2)}</span>
            <span className="discount-badge">-{game.discount_percentage}%</span>
          </div>
          <div className="current-price">€{game.discounted_price.toFixed(2)}</div>
        </div>
        
        <div className="card-footer">
          <div className="cashback-info">
            Cashback: <span className="cashback-amount">€{game.cashback.toFixed(2)}</span>
          </div>
          <div className="favorites">
            ♡ {game.favorites}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
