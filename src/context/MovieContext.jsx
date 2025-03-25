import React, { createContext, useEffect } from "react";
import apiClient from "../services/apiClient";

export const MovieContext = createContext({
  nowPlayingMovies: [],
  upComingMovies: [],
});

export const MovieProvider = ({ children }) => {
  const [nowPlayingMovies, setNowPlayingMovies] = React.useState([]);
  const [upComingMovies, setUpComingMovies] = React.useState([]);

  const fetchMoviesByUrl = async (url) => {
    /* Thực hiện lấy dữ liệu now playing movies. */
    const response = await apiClient.get("/api/movies");
    const payload = response.data;
    if (payload.status === 200) {
      return payload.data.movies;
    }
    return [];
  };

  const fetchMovies = async () => {
    /* Thực hiện lấy dữ liệu up coming movies. */
    const nowPlayingMovies = await fetchMoviesByUrl("/now-playing");
    setNowPlayingMovies(nowPlayingMovies);

    const upComingMovies = await fetchMoviesByUrl("/upcoming");
    setUpComingMovies(upComingMovies);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ nowPlayingMovies, upComingMovies }}>
      {children}
    </MovieContext.Provider>
  );
};
