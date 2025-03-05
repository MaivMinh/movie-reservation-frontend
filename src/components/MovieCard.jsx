import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toASCIISlug from "../utils/slug.js";

const MovieCard = ({ data }) => {
  const slugName = toASCIISlug(data?.name ? data?.name : "");
  

  return (
    <Link
      to={`/mua-ve/${slugName}?movie=${data?.id}`}
      className="w-[300px] h-[450px] relative rounded-2xl group hover:cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center gap-y-4 absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-slate-950/50">
        <Link
          to={`/mua-ve/${slugName}?movie=${data?.id}`}
          className="bg-orange-500 px-4 py-2 rounded-lg w-[120px] h-[40px] opacitiy-100 flex flex-row gap-x-2 items-center justify-center text-white hover:cursor-pointer hover:bg-orange-600"
        >
          <img src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg" />
          Mua vé
        </Link>
        <Link
          to={`/trailers/${slugName}?movie=${data?.id}`}
          className="px-4 py-2 rounded-lg w-[120px] h-[40px] flex flex-row gap-x-2 items-center justify-center text-white bg-none border-2 border-white hover:cursor-pointer hover:bg-orange-400 hover:border-none"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="circle-play"
            class="svg-inline--fa fa-circle-play mr-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
            ></path>
          </svg>
          Trailer
        </Link>
      </div>

      <img className="rounded-2xl" src={data?.poster} />
    </Link>
  );
};

export default MovieCard;
