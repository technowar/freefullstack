import React, { useCallback, useEffect, useState } from 'react'
import Axios from 'axios'

const { REACT_APP_WEATHER } = process.env

export default function Weather({ capital }) {
  const [weather, setWeather] = useState(null);
  const fetchWeather = useCallback(async () => {
    const { data } = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${REACT_APP_WEATHER}`);

    setWeather({
      main: data.main,
      weather: data.weather[0],
      wind: data.wind,
    });
  }, [capital]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return weather && (
    <div>
      <h3>Weather in {capital}</h3>
      <p>
        <strong>temperature:</strong> {weather.main.temp}&deg;C
      </p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`} alt={weather.weather.description} />
      <p>
        <strong>wind:</strong> {weather.wind.speed}m/s, {weather.wind.deg}&deg;
      </p>
    </div>
  );
};
