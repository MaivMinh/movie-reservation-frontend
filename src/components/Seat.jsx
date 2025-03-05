import React from "react";

const Seat = ({ seat, onClick, isSelected, props }) => {
  return (
    <button
      onClick={() => onClick(seat)}
      {...props}
      className={`w-5 h-5 m-1 rounded-md cursor-pointer border-[1px] border-amber-600 text-[11px] flex flex-col justify-center items-center text-center ${
        isSelected ? "bg-amber-600" : "bg-white"
      }`}
    >
      <span className={isSelected ? "text-white font-semibold" : "text-black font-semibold"}>
        {seat.seatNumber}
      </span>
    </button>
  );
};

export default Seat;
