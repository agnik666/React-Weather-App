import React from "react";
import { iconUrls } from "../Functions/WeatherFunc";

export default function Forecast({ title, items }) {
  return (
    <div className="mx-10 px-10 my-10">
      <div className="flex items-center justify-center mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item) => {
          // console.log(item.temp);

          return (
            <div className="flex flex-col items-center justify-center">
              <p className="font-light text-sm">{item.title}</p>

              <img
                src={iconUrls(item.icon)}
                alt="Hourly forecast here"
                className="w-12 my-1"
              />

              <p className="font-medium">{`${item.temp.toFixed()} °`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
