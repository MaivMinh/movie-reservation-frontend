import React from "react";
import toASCIISlug from "../utils/slug.js";
import { Link } from "react-router-dom";

const NowPlayingMovie = ({ movie, ...props }) => {
  const slugName = toASCIISlug(movie.name);

  return (
    <div className={props.style} {...props}>
      <div
        key={Math.random()}
        className="w-[90%] rounded-xl relative group text-slate-950 text-sm font-semibold"
      >
        <img
          className="w-full object-cover rounded-xl z-100"
          src={movie.backdrop}
        />
        <div className="absolute top-0 left-0 w-full h-full z-[300] bg-[#0003] flex flex-col items-center justify-center gap-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:cursor-pointer">
          <Link
            to={`/mua-ve/${slugName}?movie=${movie.id}`}
            className="bg-orange-500 px-4 py-2 rounded-lg w-[120px] h-[40px] opacitiy-100 flex flex-row gap-x-2 items-center justify-center text-white hover:cursor-pointer hover:bg-orange-600"
          >
            <img src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg" />
            Mua vé
          </Link>
        </div>
      </div>
      <h3 className="mt-3 font-semibold text-sm">{movie.name}</h3>
    </div>
  );
};

export default NowPlayingMovie;
