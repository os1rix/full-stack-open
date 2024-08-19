import WeatherApi from "./WeatherApi";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt="flag" width="250px" />
      <WeatherApi capital={country.capital[0]} />
    </div>
  );
};

export default Country;
