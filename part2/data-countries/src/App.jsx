import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";
import CountryDetail from "./components/CountryDetail";
import { searchCountries } from "./services/countryServices";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await searchCountries(filter);
      setCountries(data);
    };
    if (filter) {
      fetchCountries();
    } else {
      setCountries([]);
    }
  }, [filter]);

  const renderResults = () => {
    if (!filter) return null;

    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (countries.length === 1) {
      return <CountryDetail country={countries[0]} />;
    }

    if (countries.length > 0) {
      return <CountriesList countries={countries} />;
    }
    return <p>No matches</p>;
  };

  return (
    <div className="app">
      <Filter value={filter} onChange={setFilter} />
      {renderResults()}
    </div>
  );
};

export default App;
