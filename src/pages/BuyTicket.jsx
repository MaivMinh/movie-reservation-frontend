import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { MovieContext } from "../context/MovieContext.jsx";
import NowPlayingMovie from "../components/NowPlayingMovie.jsx";
import Showtimes from "../components/Showtimes.jsx";
import { Button, Select, Table } from "antd";
import getDayOfWeek from "../utils/dayOfWeek.js";
import getDayAndMonth from "../utils/getDayAndMonth.js";
import toASCIISlug from "../utils/slug.js";
import apiClient from "../services/apiClient.js";

const BuyTicket = () => {
  const [searchParams] = useSearchParams(); // Gets query parameters
  const movieId = searchParams.get("movie"); // Gets the movieId query parameter
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  /* Thực hiện việc lấy dữ liệu bookings chung cho movie. */
  const [info, setInfo] = useState(null);
  const { nowPlayingMovies } = useContext(MovieContext);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const response = await apiClient.get(`/api/buy-ticket/${movieId}`);
    const payload = response.data;
    if (payload.status === 200) {
      setInfo(payload.data);
    }
  };

  useEffect(() => {
    if (movieId) fetchData();
  }, [movieId]);

  const movie = info?.movie;
  const slugName = toASCIISlug(movie?.name ? movie?.name : "");
  const showtimes = info?.showtimes;

  let provinces = [{ id: 0, name: "Toàn quốc" }];
  let cinemas = [{ id: 0, name: "Tất cả rạp" }];
  const set = new Set();
  showtimes?.forEach((showtime) => {
    if (!set.has(showtime.room.cinema.province.id)) {
      provinces = [...provinces, showtime.room.cinema.province];
      set.add(showtime.room.cinema.province.id);
    }
  });
  set.clear();
  showtimes?.forEach((showtime) => {
    if (!set.has(showtime.room.cinema.id)) {
      cinemas = [...cinemas, showtime.room.cinema];
      set.add(showtime.room.cinema.id);
    }
  });

  const handleClick = () => {};
  const handleProvinceChange = (provinceId) => {
    console.log(provinceId);
  };
  const handleCinemaChange = (cinemaId) => {
    console.log(cinemaId);
  };

  return (
    <div className="gap-y-10 min-h-screen w-full">
      {/* Phần cho backdrop. */}
      <div className="relative bg-black flex justify-center w-full h-full">
        <div className="absolute w-full h-full z-[300] bg-[#0003]"></div>
        <div className="relative h-full ">
          <div className="absolute top-0 -left-[0%] z-100"></div>
          <div className="relative">
            <img
              alt="Img Movie"
              loading="lazy"
              width="1440"
              height="440"
              decoding="async"
              data-nimg="1"
              className="w-[860px] h-full md:h-full lg:h-[500px] object-cover duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0"
              src={
                movie?.backdrop ||
                "https://cdn.galaxycine.vn/media/2025/1/14/attack-on-titan-the-movie-the-last-attack-4_1736838031852.jpg"
              }
              style={{ color: "transparent" }}
            />
            <button
              className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 z-[600] cursor-pointer"
              onClick={handleClick}
            >
              <img
                alt="play"
                loading="lazy"
                width="64"
                height="64"
                decoding="async"
                data-nimg="1"
                className="w-[40px] h-[40px] lg:w-[64px] lg:h-[64px] object-cover duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0"
                src="https://www.galaxycine.vn/_next/static/media/button-play.2f9c0030.png"
                style={{ color: "transparent" }}
              />
            </button>
          </div>
          <div className="absolute top-0 -right-[0%] z-100 lg:block hidden"></div>
        </div>
      </div>

      {/* Phần dành cho thông tin phim và showtimes. */}
      <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-7 gap-8 text-slate-950">
        {/* Phần dành cho thông tin phim. Bao gồm hình ảnh, tên phim, thể loại, thời gian chiếu...*/}
        <div className="lg:col-span-5 h-[100px] grid grid-cols-3 relative z-[700]">
          <div className="col-span-full grid grid-cols-3">
            <div className="col-span-1 relative top-0 left-0 -translate-y-[100px] z-[800]">
              <img
                width={200}
                height={280}
                className="lg:w-[280px] lg:h-[400px] rounded-2xl border-2 border-white"
                src={movie?.poster || "https://picsum.photos/200/300"}
              />
            </div>
            <div className="col-span-2 flex flex-col justify-end gap-y-4">
              <div className="flex flex-row justify-start items-center">
                <h1 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-black-10 mr-4">
                  {movie?.name || "Tên phim"}
                </h1>
                <span className="inline-flex items-center justify-center w-[38px] h-7 bg-primary rounded text-sm text-center text-white font-bold not-italic">
                  K
                </span>
              </div>
              <div className="flex flex-row items-baseline justify-start gap-x-6">
                <div className="flex flex-row gap-x-1 items-center justify-start">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="inline-block align-baseline mr-1"
                  >
                    <path
                      d="M7 0C3.13306 0 0 3.13306 0 7C0 10.8669 3.13306 14 7 14C10.8669 14 14 10.8669 14 7C14 3.13306 10.8669 0 7 0ZM7 12.6452C3.88105 12.6452 1.35484 10.119 1.35484 7C1.35484 3.88105 3.88105 1.35484 7 1.35484C10.119 1.35484 12.6452 3.88105 12.6452 7C12.6452 10.119 10.119 12.6452 7 12.6452ZM8.74435 9.69839L6.34798 7.95685C6.26048 7.89193 6.20968 7.79032 6.20968 7.68306V3.04839C6.20968 2.8621 6.3621 2.70968 6.54839 2.70968H7.45161C7.6379 2.70968 7.79032 2.8621 7.79032 3.04839V7.04798L9.67581 8.41976C9.82823 8.52984 9.85927 8.74153 9.74919 8.89395L9.21855 9.625C9.10847 9.7746 8.89677 9.80847 8.74435 9.69839Z"
                      fill="#F58020"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-950">
                    {movie?.duration || "120 phút"}
                  </span>
                </div>
                <div className="flex flex-row gap-x-1 items-center justify-start">
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    className="inline-block align-baseline mr-1"
                  >
                    <path
                      d="M10.7143 1.75H9.42857V0.328125C9.42857 0.147656 9.28393 0 9.10714 0H8.03571C7.85893 0 7.71429 0.147656 7.71429 0.328125V1.75H4.28571V0.328125C4.28571 0.147656 4.14107 0 3.96429 0H2.89286C2.71607 0 2.57143 0.147656 2.57143 0.328125V1.75H1.28571C0.575893 1.75 0 2.33789 0 3.0625V12.6875C0 13.4121 0.575893 14 1.28571 14H10.7143C11.4241 14 12 13.4121 12 12.6875V3.0625C12 2.33789 11.4241 1.75 10.7143 1.75ZM10.5536 12.6875H1.44643C1.35804 12.6875 1.28571 12.6137 1.28571 12.5234V4.375H10.7143V12.5234C10.7143 12.6137 10.642 12.6875 10.5536 12.6875Z"
                      fill="#F58020"
                    ></path>
                  </svg>
                  <span className="text-sm text-slate-950">
                    {movie?.releaseDate || "20/10/2021"}
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-x-1 items-baseline justify-start">
                <svg
                  aria-hidden="true"
                  width={22.5}
                  height={20}
                  color="#F58020"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  className="svg-inline--fa fa-star text-primary mr-1 hover:text-primary transition duration-500 ease-in-out"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  ></path>
                </svg>
                <span className="text-xl text-slate-950">
                  {movie?.voteAverage || "8.0"}
                </span>
                <span className="text-[13px] text-slate-500 ml-1">
                  ({movie?.voteCount || "100"} votes)
                </span>
              </div>
              <div className="flex flex-col gap-y-3 items-baseline justify-start text-slate-950">
                <div className="flex flex-nowrap text-sm">
                  <span className="inline-block h-8 py-[6px] text-slate-500">
                    Quốc gia:
                  </span>
                  <span className="inline-block h-8 ml-4 py-[6px] capitalize not-italic">
                    Mỹ, Nhật Bản
                  </span>
                </div>
                <div className="flex flex-nowrap items-center text-sm ">
                  <span className="text-slate-500">Nhà sản xuất:</span>
                  <ul className="ml-2 flex flex-wrap gap-1 flex-6">
                    <li className="text-sm cursor-pointer hover:text-primary transition duration-500 ease-in-out">
                      <span className="mr-[1px]">Paramount Pictures</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full flex flex-nowrap items-center text-sm">
                  <span className="inline-block py-[6px] text-slate-500 font-semibold min-w-[70px]">
                    Thể loại:
                  </span>
                  <ul className="ml-2 flex flex-wrap flex-row justify-start gap-3">
                    {movie?.genres.map((genre) => {
                      return (
                        <li className="inline-block" key={genre.id}>
                          <Link
                            to={`/genres/${genre.id}`}
                            className="text-black border-gray-400 text-sm inline-flex h-8 border hover:border-orange-400 rounded-lg px-4 py-2 capitalize not-italic items-center"
                            href="/genre"
                          >
                            {genre.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex flex-nowrap items-center text-sm">
                  <span className="inline-block py-[6px] text-slate-500 font-semibold min-w-[70px]">
                    Đạo diễn:
                  </span>
                  <ul className="ml-2 flex flex-row gap-1">
                    <li className="inline-block">
                      <span className="text-black border-[1px] border-gray-400 rounded-lg hover:border-orange-500 hover:cursor-pointer px-4 py-2">
                        Jeff Fowler
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-row items-baseline text-sm ">
                  <span className="inline-block py-[6px] text-slate-500 font-semibold min-w-[70px]">
                    Diễn viên:
                  </span>
                  <ul className="ml-2 flex flex-wrap flex-row gap-1 flex-1 gap-y-2">
                    <li className="inline-block">
                      <a
                        className="text-black border-gray-400 text-sm inline-flex h-8 border hover:border-orange-400 rounded-lg px-4 py-2 capitalize not-italic items-center"
                        href="/dien-vien/ben-schwartz-1/"
                      >
                        Ben Schwartz
                      </a>
                    </li>
                    <li className="inline-block">
                      <a
                        className="text-black border-gray-400 text-sm inline-flex h-8 border hover:border-orange-400 rounded-lg px-4 py-2 capitalize not-italic items-center"
                        href="/dien-vien/james-marsden/"
                      >
                        James Marsden
                      </a>
                    </li>
                    <li className="inline-block">
                      <a
                        className="text-black border-gray-400 text-sm inline-flex h-8 border hover:border-orange-400 rounded-lg px-4 py-2 capitalize not-italic items-center"
                        href="/dien-vien/jim-carrey/"
                      >
                        Jim Carrey
                      </a>
                    </li>
                    <li className="inline-block">
                      <a
                        className="text-black border-gray-400 text-sm inline-flex h-8 border hover:border-orange-400 rounded-lg px-4 py-2 capitalize not-italic items-center"
                        href="/dien-vien/keanu-reeves/"
                      >
                        {" "}
                        Keanu Reeves
                      </a>
                    </li>
                    <li className="inline-block">
                      <a
                        className="text-black border-gray-400 text-sm inline-flex h-8 border hover:border-orange-400 rounded-lg px-4 py-2 capitalize not-italic items-center"
                        href="/dien-vien/idris-elba/"
                      >
                        Idris Elba
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full mt-10 min-h-screen">
            <div className="flex flex-row items-baseline justify-start">
              <a className="">
                <span className="border-l-4 border-solid border-[#034ea2] mr-2"></span>
                <h1 className="mr-10 not-italic inline text-black text-lg font-semibold">
                  Nội dung phim
                </h1>
              </a>
            </div>
            <p className="text-sm mt-4">
              {movie?.description || "Nội dung phim"}
            </p>
            <div className="flex flex-row items-baseline justify-start mt-12">
              <a className="">
                <span className="border-l-4 border-solid border-[#034ea2] mr-2"></span>
                <h1 className="mr-10 not-italic inline text-black text-lg font-semibold">
                  Lịch chiếu
                </h1>
              </a>
            </div>
            <div className="border-b-2 border-solid border-gray-500 grid grid-cols-10 h-30 gap-x-5">
              <div className="col-span-6 relative">
                <div className="w-full h-full">
                  <div className="  flex flex-row items-center justify-center w-full h-full">
                    <Showtimes
                      showtimes={showtimes}
                      onClick={setSelectedShowtime}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-4 flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-end gap-x-4 w-full -translate-y-[20%]">
                  <Select
                    defaultValue={provinces[0].name}
                    style={{
                      width: 240,
                    }}
                    onChange={handleProvinceChange}
                    options={provinces.map((province) => ({
                      label: province.name,
                      value: province.id,
                    }))}
                  />
                  <Select
                    defaultValue={cinemas[0].name}
                    style={{
                      width: 240,
                    }}
                    onChange={handleCinemaChange}
                    options={cinemas.map((cinema) => ({
                      label: cinema.name,
                      value: cinema.id,
                    }))}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 w-full min-h-96">
              {showtimes?.map((showtime, index) => {
                return (
                  <div
                    className={
                      index % 2 === 0
                        ? "bg-[#F6F0F0] border-b-[1px] border-gray-500"
                        : "border-b-[1px] border-gray-500"
                    }
                  >
                    <div className="w-full flex flex-col items-start justify-start gap-2 p-4">
                      <p>{showtime.room.cinema.name}</p>
                      <p>
                        {getDayOfWeek(showtime.date)} - Ngày{" "}
                        {getDayAndMonth(showtime.date)}
                      </p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-center gap-4 p-4">
                      <Link to={`/booking/${slugName}?showtime=${showtime.id}`}>
                        <li className="inline-block">
                          <span className="text-black border-[1px] border-gray-400 rounded-lg hover:border-orange-500 hover:cursor-pointer px-4 py-2">
                            {showtime.startTime}
                          </span>
                        </li>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Phần dành cho phim đang chiếu. */}
        <div className="lg:col-span-2 w-full mt-10 flex flex-col gap-4 justify-start items-left">
          <div className="flex flex-row items-baseline justify-start">
            <a>
              <span className="border-l-4 border-solid border-[#034ea2] mr-2"></span>
              <h1 className="mr-10 not-italic uppercase inline text-black text-2xl">
                Phim đang chiếu
              </h1>
            </a>
          </div>
          {nowPlayingMovies.map((movie) => {
            return <NowPlayingMovie movie={movie} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
