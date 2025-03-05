import React, { useState } from "react";
import Showtime from "./Showtime";

const Showtimes = ({ showtimes, onClick, props }) => {
  const handleShowtimeSelection = (showtime) => {
    onClick(showtime);
    setSelected(showtime);
  };
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full h-full">
      {/* Left scroll button */}
      <button
        className="absolute left-0 top-1/2 -translate-y-[75%] bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 cursor-pointer"
        onClick={() =>
          document
            .getElementById("dates-container")
            .scrollBy({ left: -100, behavior: "smooth" })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Scrollable container */}
      <div
        id="dates-container"
        className="flex overflow-x-auto py-4 hide-scrollbar scroll-smooth mx-11"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {showtimes?.map((showtime, index) => {
          return (
            <Showtime
              showtime={showtime}
              key={index}
              onClick={handleShowtimeSelection}
              isSelected={showtime.id === selected?.id}
            />
          );
        })}
      </div>

      {/* Right scroll button */}
      <button
        className="absolute right-0 top-1/2 -translate-y-[75%] bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 cursor-pointer"
        onClick={() =>
          document
            .getElementById("dates-container")
            .scrollBy({ left: 100, behavior: "smooth" })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Showtimes;
