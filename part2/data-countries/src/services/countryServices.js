import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

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
