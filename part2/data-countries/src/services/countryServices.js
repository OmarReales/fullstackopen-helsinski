import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";

export const searchCountries = async (searchTerm) => {
  if (!searchTerm) return [];

  try {
    const { data } = await axios.get(`${BASE_URL}/all`);
    return data.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const getCountryByName = async (name) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/name/${name}`);
    return data;
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
};

export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const { data } = await axios.get(
      `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}`
    );
    return {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
