import { useEffect, useState } from "react";
import { getWeatherByCoordinates } from "../services/countryServices";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (country.capitalInfo?.latlng) {
        const [lat, lon] = country.capitalInfo.latlng;
        const weatherData = await getWeatherByCoordinates(lat, lon);
        setWeather(weatherData);
      }
    };
    fetchWeather();
  }, [country]);
  return (
    <div className="country-detail">
      <h2>{country.name.common}</h2>
      <div className="country-info">
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
      </div>
      <div className="language">
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages || {}).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div className="flag">
        <img src={country.flags.png} alt={country.name.common} />
      </div>
      {weather ? (
        <div className="weather">
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <img src={weather.icon} alt={weather.condition} />
          <p>Condition: {weather.condition}</p>
          <img src={weather.icon} alt={weather.condition} />
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default CountryDetail;
