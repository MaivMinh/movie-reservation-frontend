import React from "react";
import getDayOfWeek from "../utils/dayOfWeek.js";
import getDayAndMonth from "../utils/getDayAndMonth.js";

const Showtime = ({ showtime, onClick, isSelected, props }) => {
  const handleShowtimeSelection = (showtime) => {
    onClick(showtime);
  };

  const style = isSelected
    ? "mr-3 min-w-[80px] h-16 flex-shrink-0 flex flex-col items-center justify-center rounded-2xl bg-[#034ea2] hover:bg-[#023b7a] text-white text-sm cursor-pointer transition-colors"
    : "mr-3 min-w-[80px] h-16 flex-shrink-0 flex flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] hover:bg-gray-600 hover:text-[#F6F6F6] text-black text-sm cursor-pointer transition-colors";

  return (
    <div
      className={style}
      onClick={() => handleShowtimeSelection(showtime)}
    >
      <span className="font-medium">{getDayOfWeek(showtime.date)}</span>
      <span>{getDayAndMonth(showtime.date)}</span>
    </div>
  );
};

export default Showtime;
