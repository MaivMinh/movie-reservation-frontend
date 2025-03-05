import React from "react";

const MovieCategoryButton = ({ name, id, api, onClick, enable }) => {
  const handleClick = () => {
    onClick({ api, id });
  };

  return (
    <a className="flex flex-col items-center">
      {enable ? (
        <button
          onClick={handleClick}
          className="text-black font-bold text-xl cursor-pointer flex flex-col items-center"
        >
          <span>{name}</span>
          <span class="border-t-4 border-solid border-orange-700 inline-block w-[75%]"></span>
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="text-gray-400 font-bold text-xl cursor-pointer hover:text-slate-700"
        >
          {name}
        </button>
      )}
    </a>
  );
};

export default MovieCategoryButton;
