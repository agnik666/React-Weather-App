import { DateTime } from "luxon";
import axios from "axios";

const API_KEY = "ccadedcc94e24618168de7125ec7ba7f";
const base_url = "https://api.openweathermap.org/data/2.5/";
const timeZone_url = "https://api.wheretheiss.at/v1/coordinates/";

/* 
    https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=-74.0060
    &appid=ccadedcc94e24618168de7125ec7ba7f&units=metric
*/

async function getWeatherData(apiEndpoint, searchParams) {
  const url = new URL(base_url + apiEndpoint);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  try {
    const res = await axios.get(url);

    return res.data;
  } catch (err) {
    // alert(err.message);
    return null;
  }
}

async function getTimeZone({ lat, lon }) {
  const url = `${timeZone_url}${lat},${lon}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.timezone_id;
}

function formatWeatherData(data) {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main, icon } = weather[0];

  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    speed,
    main,
    icon,
  };
}

function formatForecastData(zone, data) {
  let { list: hourlyData } = data;

  // slice(1, 6) --> 1 gives next day weather data, 6 gives till 5th day
  hourlyData = hourlyData.slice(1, 6).map((item) => {
    return {
      title: localTimeFormat(item.dt, zone, "hh:mm a"),
      temp: item.main.temp,
      icon: item.weather[0].icon,
    };
  });

  return { hourlyData };
}

const localTimeFormat = (
  seconds,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(seconds).setZone(zone).toFormat(format);

// generates url for different icon codes
const iconUrls = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

export default async function getFormattedData(searchParams) {
  try {
    const weatherData = await getWeatherData("weather", searchParams);

    const formattedWeatherData = formatWeatherData(weatherData);

    const { lat, lon } = formattedWeatherData;

    const timeZone = await getTimeZone({ lat, lon }); // zone -> will get timezone from lat and lon

    const forecastWeatherData = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    });

    const formattedForecastWeatherData = formatForecastData(
      timeZone,
      forecastWeatherData
    );

    return {
      ...formattedWeatherData,
      ...formattedForecastWeatherData,
      timeZone,
    };
  } catch (err) {
    // alert(err.message);
    return null;
  }
}

export { localTimeFormat, iconUrls };
