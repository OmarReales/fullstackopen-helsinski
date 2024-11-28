# Weather and Country Search App

A React app to search for countries and display weather information for their capitals.

## APIs Used

### 1. Rest Countries API

Provides detailed information about countries, including:

- Name
- Capital
- Population
- Area
- Languages
- Flags

**Base URL:** `https://studies.cs.helsinki.fi/restcountries/api`

### 2. WeatherAPI

Used to fetch current weather data for the capital city of a selected country.

**Base URL:** `https://api.weatherapi.com/v1`

---

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your WeatherAPI key:

   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Run the app:
   ```
    npm run dev
   ```

## Links

- [Rest Countries API](https://studies.cs.helsinki.fi/restcountries/)
- [Weather API](https://www.weatherapi.com/)
