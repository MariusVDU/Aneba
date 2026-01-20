# Ameba Game Store - Web Application

A modern web application for browsing and searching games, built with React frontend and Node.js backend.

## 🎮 Features

- **Fuzzy search functionality** - Find games with typos or partial matches
- **REST API endpoints** - `/list` and `/list?search=<query>`
- **12 pre-loaded games** - FIFA 23, Red Dead Redemption 2, Split Fiction, GTA V
- **Custom game images** - JPG images for each game
- **Responsive design** - Works on desktop and mobile
- **Hot Module Replacement** - Instant updates during development
- **SQLite database** - Persistent storage
- **Modern React hooks** - useState, useEffect
- **Purple Ameba theme** - Matching the original design
- **Real-time search** - Results update as you type

## 📦 Included Games

The application comes pre-loaded with the following games:
- **Split Fiction** (4 versions: EA App, Xbox Live, Nintendo Switch)
- **FIFA 23** (3 versions: Origin, Xbox, PlayStation)
- **Red Dead Redemption 2** (4 versions: Rockstar, Xbox, PlayStation, Steam)
- **Grand Theft Auto V** (Rockstar version)

Total: 12 game listings across multiple platforms and regions

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **CSS3** - Styling with gradients and animations
- **Fetch API** - For API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **Fuse.js** - Fuzzy search library
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

## 🚀 Quick Start

### **One Command to Rule Them All** ⚡

**PowerShell (Recommended):**
```powershell
.\start.ps1
```

**Windows Command Prompt:**
```cmd
start.bat
```

**What happens:**
1. ✅ Auto-installs dependencies (if needed)
2. ✅ Starts backend server (port 5000)
3. ✅ Starts frontend dev server (port 3000)
4. ✅ Ready to use!

**To Stop:** Press `Ctrl+C` - both servers will stop automatically

**Access the app:** Open browser at `http://localhost:3000`

---

## 📦 Manual Installation (Optional)

If you want to install dependencies separately:

```bash
# From the root directory
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

---

## 🎮 Usage

### Starting the Application

**Simple way:**
```powershell
.\start.ps1    # PowerShell
# or
start.bat      # Command Prompt
```

**Manual way (for development):**

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
# Or directly:
cd client
npm run dev
```

#### Option C: Development Mode (Combined)

```bash
npm run dev
```

This requires the `concurrently` package and starts both servers together.

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📡 API Endpoints

### Get All Games
```
GET http://localhost:5000/list
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Split Fiction EA App Key (PC) GLOBAL",
    "platform": "EA App",
    "region": "GLOBAL",
    "original_price": 49.99,
    "discounted_price": 40.93,
    "discount_percentage": 18,
    "cashback": 4.50,
    "favorites": 626,
    "image_url": "/images/split-fiction.jpg"
  },
  ...
]
```

### Search Games
```
GET http://localhost:5000/list?search=fifa
```

**Query Parameters:**
- `search` - Search term (fuzzy search enabled)

**Example Searches:**
- `http://localhost:5000/list?search=split fiction`
- `http://localhost:5000/list?search=fifa`
- `http://localhost:5000/list?search=red dead`
- `http://localhost:5000/list?search=xbox`

## 🗄 Database Schema

```sql
CREATE TABLE games (
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
```

## 📁 Project Structure

```
eneba/
├── 🚀 START HERE
│   ├── start.ps1              # PowerShell startup (Ctrl+C to stop)
│   └── start.bat              # Batch startup (Ctrl+C to stop)
├── 📚 DOCUMENTATION
│   ├── README.md              # This file
│   └── QUICKSTART.md          # Quick guide (Lithuanian)
├── 🔧 SERVER
│   └── server/
│       └── index.js           # Express server & API
├── 💻 CLIENT
│   └── client/
│       ├── index.html         # HTML entry
│       ├── vite.config.js     # Vite config
│       └── src/
│           ├── main.jsx       # Entry point
│           ├── App.jsx        # Main component
│           └── components/
│               ├── SearchBar.jsx
│               └── GameCard.jsx
└── 🗄️ DATABASE
    └── games.db               # SQLite (auto-created)
```

## 🎨 Design Features

The application replicates the Ameba design with:
- **Purple gradient background** (#1a1a2e → #16213e → #0f3460)
- **Card-based layout** with hover effects
- **Cashback badges** in green
- **Platform indicators** with icons
- **Discount badges** showing percentage off
- **Regional tags** (GLOBAL, EUROPE)
- **Responsive grid layout** adapting to screen size

## 🔍 Search Functionality

The search feature uses **Fuse.js** for fuzzy matching with:
- Threshold of 0.4 for relevance
- Search across title and platform fields
- Handles typos and partial matches
- Real-time search results

## 🧪 Testing the Application

### Test the API directly:

```bash
# Get all games
curl http://localhost:5000/list

# Search for "split fiction"
curl "http://localhost:5000/list?search=split%20fiction"

# Search for "fifa"
curl "http://localhost:5000/list?search=fifa"
```

### Test in Browser:

1. Open `http://localhost:3000`
2. Try searching for:
   - "split fiction"
   - "fifa 23"
   - "red dead redemption"
   - "xbox" (finds all Xbox games)
   - "global" (finds all global region games)

## 🔧 Development

### Adding New Games

Edit `server/index.js` and add new entries to the `games` array in the `seedDatabase()` function:

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
  image_url: '/images/game.jpg'
}
```

Then delete `games.db` and restart the server to recreate the database with new data.

### Customizing Styles

Main style files:
- `client/src/App.css` - Overall layout and header
- `client/src/components/GameCard.css` - Game card styling
- `client/src/components/SearchBar.css` - Search bar styling

## 📝 Notes

- The database is automatically created and seeded on first run
- Images are placeholder gradients (can be replaced with actual images)
- The frontend uses a proxy to avoid CORS issues in development
- Fuzzy search threshold can be adjusted in `server/index.js`

## 🚀 Production Build

To create a production build:

```bash
cd client
npm run build
```

The optimized files will be in `client/dist/` directory.

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on deploying to free hosting services like:
- **Render** (recommended) - Free tier with auto-deploy from GitHub
- **Railway** - $5 monthly credit
- **Fly.io** - Free tier for 3 apps

The application is pre-configured with `render.yaml` for one-click deployment.

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Author

Created as a technical assessment project.

---

**Enjoy browsing games! 🎮**
