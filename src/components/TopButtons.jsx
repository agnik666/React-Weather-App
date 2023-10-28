import React from "react";

export default function TopButtons({ setQuery }) {
  // creating the list of cities option at the topmost part of page
  const cities = [
    {
      id: 1,
      city: "Delhi",
    },
    {
      id: 2,
      city: "London",
    },
    {
      id: 3,
      city: "New York",
    },
    {
      id: 4,
      city: "Dubai",
    },
    {
      id: 5,
      city: "Sydney",
    },
  ];

  // return a div container wrapping up all the top cities buttons
  return (
    <div className="top--buttons flex items-center justify-around py-6 mx-12">
      {cities.map((item) => (
        <button
          key={item.id}
          className="text-white font-medium text-lg"
          onClick={() => setQuery({ q: item.city })}
        >
          {item.city}
        </button>
      ))}
    </div>
  );
}
