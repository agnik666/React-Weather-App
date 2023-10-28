import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Inputs({ setQuery, units, setUnits }) {
  // state for storing input citites
  const [city, setCity] = useState("");

  // function to handle search input
  const handleSearchInput = () => {
    if (city) setQuery({ q: city });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnits = (event) => {
    const selectedUnit = event.target.name;

    if (units !== selectedUnit)
      // to prevent re-rendering of component, on clicking same unit
      setUnits(selectedUnit);
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/5 items-center justify-end space-x-4">
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search..."
          className="text-xl rounded-md font-light p-2 w-3/6 shadow-xl focus:outline-none capitalize placeholder:lowercase"
        ></input>

        <FontAwesomeIcon
          icon="fa-solid fa-magnifying-glass"
          size="lg"
          style={{ color: "#f7f7f8" }}
          className="cursor-pointer transition ease-in-out hover:scale-125"
          onClick={handleSearchInput}
        />

        <FontAwesomeIcon
          icon="fa-solid fa-location-crosshairs"
          size="lg"
          style={{ color: "#f7f7f8" }}
          className="cursor-pointer transition ease-in-out hover:scale-125"
          onClick={handleLocation}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-in-out hover:scale-125"
          onClick={handleUnits}
        >
          °C
        </button>

        <p className="text-xl text-white mx-2">|</p>

        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-in-out hover:scale-125"
          onClick={handleUnits}
        >
          °F
        </button>
      </div>
    </div>
  );
}
