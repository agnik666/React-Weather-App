import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconUrls, localTimeFormat } from "../Functions/WeatherFunc";

export default function TemperatureDetails({
  weather: {
    main,
    temp,
    temp_max,
    temp_min,
    icon,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{main}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3 mx-24">
        <img src={iconUrls(icon)} alt="Weather Icon" className="w-20" />

        <p className="text-5xl">{`${temp.toFixed()} °`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <FontAwesomeIcon
              icon="fa-solid fa-temperature-three-quarters"
              style={{ color: "#f7f7f8" }}
              className="mr-1"
            />
            Real feel:
            <span className="font-medium ml-1">{`${feels_like.toFixed()} °`}</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <FontAwesomeIcon
              icon="fa-solid fa-water"
              style={{ color: "#f5f5f5" }}
              className="mr-1"
            />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()} %`}</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <FontAwesomeIcon
              icon="fa-solid fa-wind"
              style={{ color: "#f7f7f8" }}
              className="mr-1"
            />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <FontAwesomeIcon icon="fa-solid fa-sun" style={{ color: "#f5f7f9" }} />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {localTimeFormat(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <FontAwesomeIcon icon="fa-solid fa-sun" style={{ color: "#f4f5f5" }} />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {localTimeFormat(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <FontAwesomeIcon
          icon="fa-solid fa-temperature-high"
          style={{ color: "#f7f7f8" }}
        />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()} °`}</span>
        </p>
        <p className="font-light">|</p>

        <FontAwesomeIcon
          icon="fa-solid fa-temperature-low"
          style={{ color: "#f7f7f8" }}
        />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()} °`}</span>
        </p>
        <p className="font-light">|</p>
      </div>
    </div>
  );
}
