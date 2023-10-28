import React from "react";
import { localTimeFormat } from "../Functions/WeatherFunc";

export default function TLCBar({ weather: { dt, timeZone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {localTimeFormat(dt, timeZone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
}
