import React from "react";

const Seat = ({ seat, onClick, isSelected, props }) => {
  const handleButtonClick = (seat) => {
    if (seat.isBooked || seat.isReserved) return;
    onClick(seat);
  };

  return (
    <button
      onClick={() => handleButtonClick(seat)}
      {...props}
      className={`w-5 h-5 m-1 rounded-md cursor-pointer border-[1px] border-amber-600 text-[11px] flex flex-col justify-center items-center text-center ${
        isSelected || seat.isBooked || seat.isReserved
          ? "bg-amber-600"
          : "bg-white"
      }`}
    >
      <span
        className={
          isSelected || seat.isBooked || seat.isReserved
            ? "text-white font-semibold"
            : "text-black font-semibold"
        }
      >
        {seat.seatNumber}
      </span>
    </button>
  );
};

export default Seat;
