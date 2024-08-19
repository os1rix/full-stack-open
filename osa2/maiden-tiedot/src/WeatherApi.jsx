import { useState, useEffect } from "react";
import axios from "axios";

const WeatherApi = ({ capital }) => {
  const apiKey = import.meta.env.VITE_SOME_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}&units=m`
      )
      .then((response) => {
        setWeather(response.data.current);
      });
  }, [apiKey, capital]);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature {weather.temperature} celsius</div>
      <img src={weather.weather_icons} alt="weather-icon" />
      <div>
        Wind {weather.wind_speed} km/h Direction {weather.wind_dir}
      </div>
    </div>
  );
};

export default WeatherApi;
