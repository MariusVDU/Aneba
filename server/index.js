const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const Fuse = require('fuse.js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from React build
if (process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT) {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize SQLite database
const db = new sqlite3.Database('./games.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Create tables and seed data
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      platform TEXT NOT NULL,
      region TEXT NOT NULL,
      original_price REAL NOT NULL,
      discounted_price REAL NOT NULL,
      discount_percentage INTEGER NOT NULL,
      cashback REAL NOT NULL,
      favorites INTEGER DEFAULT 0,
      image_url TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      seedDatabase();
    }
  });
}

// Seed database with games
function seedDatabase() {
  db.get('SELECT COUNT(*) as count FROM games', (err, row) => {
    if (err) {
      console.error('Error checking database:', err);
      return;
    }
    
    if (row.count === 0) {
      const games = [
        // Split Fiction
        {
          title: 'Split Fiction EA App Key (PC) GLOBAL',
          platform: 'EA App',
          region: 'GLOBAL',
          original_price: 49.99,
          discounted_price: 40.93,
          discount_percentage: 18,
          cashback: 4.50,
          favorites: 626,
          image_url: '/images/splitfiction.jpg'
        },
        {
          title: 'Split Fiction (Xbox Series X|S) XBOX LIVE Key EUROPE',
          platform: 'Xbox Live',
          region: 'EUROPE',
          original_price: 49.99,
          discounted_price: 34.14,
          discount_percentage: 32,
          cashback: 3.76,
          favorites: 502,
          image_url: '/images/splitfiction.jpg'
        },
        {
          title: 'Split Fiction (Xbox Series X|S) XBOX LIVE Key GLOBAL',
          platform: 'Xbox Live',
          region: 'GLOBAL',
          original_price: 49.99,
          discounted_price: 35.15,
          discount_percentage: 30,
          cashback: 3.87,
          favorites: 1039,
          image_url: '/images/splitfiction.jpg'
        },
        {
          title: 'Split Fiction (Nintendo Switch 2) eShop Key EUROPE',
          platform: 'Nintendo',
          region: 'EUROPE',
          original_price: 49.99,
          discounted_price: 36.25,
          discount_percentage: 27,
          cashback: 3.99,
          favorites: 288,
          image_url: '/images/splitfiction.jpg'
        },
        // FIFA 23
        {
          title: 'FIFA 23 (PC) Origin Key GLOBAL',
          platform: 'EA App',
          region: 'GLOBAL',
          original_price: 69.99,
          discounted_price: 24.99,
          discount_percentage: 64,
          cashback: 2.75,
          favorites: 1542,
          image_url: '/images/fifa23.jpg'
        },
        {
          title: 'FIFA 23 (Xbox Series X|S) XBOX LIVE Key EUROPE',
          platform: 'Xbox Live',
          region: 'EUROPE',
          original_price: 69.99,
          discounted_price: 29.99,
          discount_percentage: 57,
          cashback: 3.30,
          favorites: 893,
          image_url: '/images/fifa23.jpg'
        },
        {
          title: 'FIFA 23 Standard Edition (PS5) PSN Key GLOBAL',
          platform: 'PlayStation',
          region: 'GLOBAL',
          original_price: 69.99,
          discounted_price: 32.49,
          discount_percentage: 54,
          cashback: 3.57,
          favorites: 764,
          image_url: '/images/fifa23.jpg'
        },
        // Red Dead Redemption 2
        {
          title: 'Red Dead Redemption 2 (PC) Rockstar Key GLOBAL',
          platform: 'Rockstar',
          region: 'GLOBAL',
          original_price: 59.99,
          discounted_price: 19.99,
          discount_percentage: 67,
          cashback: 2.20,
          favorites: 2341,
          image_url: '/images/reddead2.jpg'
        },
        {
          title: 'Red Dead Redemption 2 (Xbox One) XBOX LIVE Key EUROPE',
          platform: 'Xbox Live',
          region: 'EUROPE',
          original_price: 59.99,
          discounted_price: 22.99,
          discount_percentage: 62,
          cashback: 2.53,
          favorites: 1876,
          image_url: '/images/reddead2.jpg'
        },
        {
          title: 'Red Dead Redemption 2 Ultimate Edition (PS4) PSN Key GLOBAL',
          platform: 'PlayStation',
          region: 'GLOBAL',
          original_price: 99.99,
          discounted_price: 34.99,
          discount_percentage: 65,
          cashback: 3.85,
          favorites: 1523,
          image_url: '/images/reddead2.jpg'
        },
        {
          title: 'Red Dead Redemption 2 Special Edition Steam Key GLOBAL',
          platform: 'Steam',
          region: 'GLOBAL',
          original_price: 79.99,
          discounted_price: 27.99,
          discount_percentage: 65,
          cashback: 3.08,
          favorites: 3456,
          image_url: '/images/reddead2.jpg'
        },
        // Additional games for variety
        {
          title: 'Grand Theft Auto V Premium Edition (PC) Rockstar Key GLOBAL',
          platform: 'Rockstar',
          region: 'GLOBAL',
          original_price: 29.99,
          discounted_price: 14.99,
          discount_percentage: 50,
          cashback: 1.65,
          favorites: 5234,
          image_url: '/images/gtavpremium.jpg'
        }
      ];

      const stmt = db.prepare(`
        INSERT INTO games (title, platform, region, original_price, discounted_price, 
                          discount_percentage, cashback, favorites, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      games.forEach(game => {
        stmt.run(
          game.title,
          game.platform,
          game.region,
          game.original_price,
          game.discounted_price,
          game.discount_percentage,
          game.cashback,
          game.favorites,
          game.image_url
        );
      });

      stmt.finalize();
      console.log('Database seeded with games');
    }
  });
}

// API Routes
app.get('/list', (req, res) => {
  const searchQuery = req.query.search;

  db.all('SELECT * FROM games', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (searchQuery) {
      // Use Fuse.js for fuzzy search
      const fuse = new Fuse(rows, {
        keys: ['title', 'platform'],
        threshold: 0.4,
        includeScore: true
      });

      const results = fuse.search(searchQuery).map(result => result.item);
      res.json(results);
    } else {
      res.json(rows);
    }
  });
});

// Serve React app for all other routes (SPA catch-all)
if (process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
