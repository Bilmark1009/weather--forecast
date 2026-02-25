# SkyCast Weather Forecast

A modern, full-stack weather forecast application built with Laravel (backend) and React (frontend). SkyCast provides real-time weather data with a beautiful, responsive interface.

## 🌟 Features

- **Real-time Weather Data**: Fetches current weather information from OpenWeatherMap API
- **Modern UI**: Clean, responsive design built with React and TailwindCSS
- **RESTful API**: Laravel backend with robust API endpoints
- **Admin Panel**: Filament admin interface for management
- **CORS Support**: Properly configured for cross-origin requests
- **Environment Configuration**: Secure environment variable management

## 🏗️ Architecture

### Backend (skycast-backend)
- **Framework**: Laravel 12.0
- **Admin Panel**: Filament 3.3
- **Database**: SQLite (configurable)
- **Authentication**: Laravel Sanctum
- **API**: RESTful endpoints for weather data

### Frontend (skycast-frontend)
- **Framework**: React with Vite
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites
- PHP 8.2+
- Node.js 18+
- Composer
- npm
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-forecast
   ```

2. **Backend Setup**
   ```bash
   cd skycast-backend
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configure Environment**
   Edit `.env` file in `skycast-backend`:
   ```env
   OWM_API_KEY=your_openweathermap_api_key_here
   FRONTEND_URL=http://localhost:5173
   ```

4. **Database Setup**
   ```bash
   php artisan migrate
   ```

5. **Frontend Setup**
   ```bash
   cd ../skycast-frontend
   npm install
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd skycast-backend
   php artisan serve
   ```
   Backend will be available at `http://localhost:8000`

2. **Start Frontend Development Server**
   ```bash
   cd skycast-frontend
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

3. **Access Admin Panel**
   Visit `http://localhost:8000/admin` for the Filament admin interface

## 📁 Project Structure

```
weather-forecast/
├── skycast-backend/           # Laravel backend
│   ├── app/                   # Application logic
│   ├── config/                # Configuration files
│   ├── database/              # Database files and migrations
│   ├── resources/             # Views and assets
│   ├── routes/                # API and web routes
│   └── .env.example           # Environment template
├── skycast-frontend/          # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks
│   │   └── assets/            # Static assets
│   └── public/                # Public files
├── package.json               # Root dependencies
└── README.md                  # This file
```

## 🔧 Development Scripts

### Backend (skycast-backend)
```bash
composer run setup      # Complete project setup
composer run dev        # Start development servers
composer run test       # Run tests
```

### Frontend (skycast-frontend)
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
```

## 🌐 API Endpoints

The backend provides RESTful API endpoints for weather data:

- `GET /api/weather/current/{city}` - Get current weather for a city
- `GET /api/weather/forecast/{city}` - Get weather forecast for a city

## 🎨 Technologies Used

### Backend
- **Laravel 12.0** - PHP Framework
- **Filament 3.3** - Admin Panel
- **Laravel Sanctum** - API Authentication
- **SQLite** - Database

### Frontend
- **React 18** - UI Library
- **Vite** - Build Tool
- **TailwindCSS** - CSS Framework
- **PostCSS** - CSS Processing

### Development Tools
- **ESLint** - Code Linting
- **PHP Pint** - Code Formatting
- **PHPUnit** - Testing

## 📝 Environment Variables

### Backend (.env)
```env
# Application
APP_NAME=SkyCast
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

# Database
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

# OpenWeatherMap API
OWM_API_KEY=your_api_key_here
OWM_BASE_URL=https://api.openweathermap.org/data/2.5
OWM_UNITS=metric

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is open-sourced software licensed under the MIT license.

## 🔑 Getting API Key

To get an OpenWeatherMap API key:

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env` file

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` in `.env` matches your frontend URL
2. **API Key Issues**: Verify your OpenWeatherMap API key is valid
3. **Database Issues**: Ensure SQLite database file exists and is writable
4. **Port Conflicts**: Change ports if 8000 or 5173 are in use

### Debug Mode

Enable debug mode in `.env`:
```env
APP_DEBUG=true
LOG_LEVEL=debug
```

## 📞 Support

For support and questions, please open an issue in the repository.
