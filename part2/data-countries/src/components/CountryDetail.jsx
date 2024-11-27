const CountryDetail = ({ country }) => {
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
    </div>
  );
};

export default CountryDetail;
