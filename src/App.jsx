import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs, { handleLocation } from "./components/Inputs";
import TLCBar from "./components/TLCBar";
import TemperatureDetails from "./components/TemperatureDetails";
import Forecast from "./components/Forecast";
import getFormattedData from "./Functions/WeatherFunc";
import { useEffect, useState } from "react";
import backgroundImage from "./Functions/BackgroundImage";
import LazyLoad from "react-lazy-load";

function App() {
  const [query, setQuery] = useState({ q: "kolkata" });
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bgImg, setBgImg] = useState();

  useEffect(() => {
    const weatherData = async () => {
      // Checking if weather data for the current query and unit exists in session storage
      const cachedData = sessionStorage.getItem(`${query.q}_${units}`);

      if (cachedData) {
        console.log("Data is fetched from session");
        setWeather(JSON.parse(cachedData));
      } else {
        const data = await getFormattedData({ ...query, units });

        // Cache the weather data in session storage, based on query and the respective unit
        sessionStorage.setItem(`${query.q}_${units}`, JSON.stringify(data));

        // console.log(data);
        // console.log(query);
        setWeather(data);
      }
    };
    console.log(weather);
    weatherData();
  }, [query, units]);

  useEffect(() => {
    const bgChange = async () => {
      if (weather) {
        const img = await backgroundImage(weather.main);
        setBgImg(img);
        console.log(img);
      } else setBgImg("https://shorturl.at/tzDH6");
    };

    bgChange();
  }, [query]);

  return (
    <LazyLoad height={200} offset={0}>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgImg})`,
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
        }}
      >
        <TopButtons setQuery={setQuery} />

        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {/* Implementing conditional rendering here*/}

        {weather && (
          <div>
            <TLCBar weather={weather} />
            <TemperatureDetails weather={weather} />

            <Forecast title="Hourly Forecast" items={weather.hourlyData} />
          </div>
        )}

        {!weather && (
          <div className="flex font-light text-5xl text-white mb-10 items-center justify-center h-screen">
            No data found!
          </div>
        )}
      </div>
    </LazyLoad>
  );
}

export default App;
