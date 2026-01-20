# Ameba Game Store - AI Agent Instructions

## Architecture Overview

This is a **full-stack game store application** with a clean client-server separation:

- **Backend** (`server/index.js`): Express + SQLite + Fuse.js fuzzy search
  - Auto-creates `games.db` on first run with 12 pre-seeded games
  - API endpoint: `/list` (with optional `?search=` query)
  - Port: 5000

- **Frontend** (`client/`): React 18 + Vite
  - Uses `VITE_API_URL` env variable for backend URL
  - Components: `App.jsx`, `SearchBar.jsx`, `GameCard.jsx`
  - Port: 3000

## Critical Developer Workflows

### Starting the Application

**Always use the startup scripts** - they handle dependency installation and orchestration:

```powershell
.\start.ps1    # PowerShell (recommended)
start.bat      # Windows CMD
```

These scripts:
1. Auto-install dependencies if missing
2. Start backend on port 5000
3. Start frontend on port 3000
4. Handle graceful shutdown on Ctrl+C (kills processes on both ports)

**Never start manually** unless debugging. The scripts include port cleanup logic that prevents "port already in use" errors.

### Database Reset

To recreate the database with fresh seed data:

```powershell
Remove-Item games.db -Force
node server/index.js  # Will recreate and reseed
```

## Project-Specific Conventions

### Image Handling

Images are stored in `client/public/images/` and referenced in the database:

- Database stores: `/images/splitfiction.jpg`
- Actual file: `client/public/images/splitfiction.jpg`
- Frontend uses `game.image_url` directly from API response

**Pattern**: Do NOT create custom image mapping logic in components. Always use `game.image_url` from the API.

### Component Patterns

```jsx
// ✅ CORRECT: Use API data directly
<div style={{ backgroundImage: `url(${game.image_url})` }} />

// ❌ WRONG: Don't create custom mapping functions
const getGameImage = () => { ... }
```

### API Response Structure

```javascript
{
  id: 1,
  title: "Split Fiction EA App Key (PC) GLOBAL",
  platform: "EA App",
  region: "GLOBAL",
  original_price: 49.99,
  discounted_price: 40.93,
  discount_percentage: 18,
  cashback: 4.50,
  favorites: 626,
  image_url: "/images/splitfiction.jpg"
}
```

## Key Integration Points

- **No authentication** - this is a display-only store
- **No external APIs** - all data seeded in `server/index.js`
- **Vite proxy configured** but not used (frontend calls backend directly)
- **CORS enabled** in backend for all origins

## Adding New Games

Edit `server/index.js` → `seedDatabase()` function:

```javascript
{
  title: 'Game Title Platform Key REGION',
  platform: 'Platform Name',
  region: 'GLOBAL',
  original_price: 59.99,
  discounted_price: 29.99,
  discount_percentage: 50,
  cashback: 3.00,
  favorites: 1000,
  image_url: '/images/gamename.jpg'  // Must match actual file in client/public/images/
}
```

Then delete `games.db` and restart to recreate with new data.

## Deployment

Pre-configured for free hosting on **Render** via `render.yaml`:
- Backend: Node.js web service
- Frontend: Static site from `client/dist`
- See `DEPLOYMENT.md` for full setup instructions

**Environment variable pattern:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

## Documentation Notes

- `README.md` - English, full technical documentation
- `QUICKSTART.md` - Lithuanian, quick start guide  
- `DEPLOYMENT.md` - Hosting setup for production
- Both reference the startup scripts as the primary way to run the app
