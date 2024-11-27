import { useState } from "react";
import CountryDetail from "./CountryDetail";

const CountriesList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (selectedCountry) {
    return <CountryDetail country={selectedCountry} />;
  }

  return (
    <div className="country-list">
      {countries.map((country) => (
        <div key={country.name.common} className="country-item">
          {country.name.common}
          <button
            onClick={() => setSelectedCountry(country)}
            className="show-button"
          >
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
