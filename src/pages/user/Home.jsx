import { Carousel, Skeleton, Slider } from "antd";
import React, { useEffect, useRef } from "react";
import movieClient from "../../services/movie.js";
import MovieCard from "../../components/MovieCard";
import MovieCategoryButton from "../../components/MovieCategoryButton.jsx";

const contentStyle = {
  borderRadius: "16px",
  width: "90%",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#364d79",
  margin: "0 auto",
};

const Home = () => {
  const [data, setData] = React.useState([]);
  const hasFetchedData = useRef(false);
  const movieApi = useRef("");
  const choosed = useRef("now_playing");

  const fetchData = async () => {
    movieClient
      .get(movieApi.current)
      .then((response) => {
        const payload = response.data;
        if (payload.status === 200) {
          console.log(payload.data.movies);
          setData(() => {
            return [...payload.data.movies];
          });
          hasFetchedData.current = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchData();
    }
  }, [data]);

  const chooseCategory = ({ api, id }) => {
    choosed.current = id;
    movieApi.current = api;
    fetchData();
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen mt-16 flex-1">
      <Carousel
        autoplay={true}
        autoplaySpeed={3000}
        speed={1000}
        dots={true}
        effect="fade"
      >
        <div className="flex flex-row justify-center items-center">
          <img
            style={contentStyle}
            src="https://cdn.galaxycine.vn/media/2025/2/4/2048x682_1738637689353.jpg"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="https://cdn.galaxycine.vn/media/2025/2/5/aot-2048_1738728077687.jpg"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="https://cdn.galaxycine.vn/media/2025/2/5/den-am-hon-2048_1738748436601.jpg"
          />
        </div>
      </Carousel>

      <div className="w-[90%] mx-auto flex flex-row mt-20 mb-4 items-center gap-x-10">
        <a>
          <span class="border-l-4 border-solid border-[#034ea2] mr-2"></span>
          <h1 class="mr-10 font-bold not-italic uppercase inline text-black text-2xl">
            Phim
          </h1>
        </a>
        <a className="flex flex-row items-center justify-center gap-x-6 text-black font-bold text-xl">
          <MovieCategoryButton
            name="Đang chiếu"
            id={"now_playing"}
            enable={choosed.current === "now_playing"}
            api={""}
            onClick={chooseCategory}
          />
          <MovieCategoryButton
            name="Sắp chiếu"
            id={"up_coming"}
            enable={choosed.current === "up_coming"}
            api={""}
            onClick={chooseCategory}
          />
          <MovieCategoryButton
            name="Phim IMAX"
            id={"imax"}
            api={""}
            enable={choosed.current === "imax"}
            onClick={chooseCategory}
          />
        </a>
      </div>

      <div className="mt-10 grid grid-cols-4 gap-x-4 gap-y-8 w-[90%] m-auto">
        {data.length > 0
          ? data.map((element) => {
              return <MovieCard key={Math.random()} data={element} />;
            })
          : null}
      </div>

      <div className="flex flex-row justify-center items-center w-full mx-auto py-20">
        <button className="w-[120px] h-[40px] bg-none border-orange-500 border-[1px] text-orange-500 rounded-md hover:bg-orange-500 hover:border-none hover:cursor-pointer hover:text-white">
          Xem thêm {`>`}
        </button>
      </div>
    </div>
  );
};

export default Home;
