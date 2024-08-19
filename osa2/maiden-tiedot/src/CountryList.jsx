import Country from "./Country.jsx";

const CountryList = ({ search, countries, setSearch }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else {
    return (
      <div>
        {filteredCountries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}&nbsp;
            <button onClick={() => setSearch(country.name.common)}>show</button>
          </p>
        ))}
      </div>
    );
  }
};

export default CountryList;
