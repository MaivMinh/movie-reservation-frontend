import React, { createContext, useEffect } from "react";
import { data } from "react-router-dom";

export const BookingContext = createContext({
  movie: null,
  seats: [],
  showtime: null,
  data: null,
  updateMovie: () => {},
  updateSeats: () => {},
  updateShowtime: () => {},
});

export const BookingProvider = ({ children }) => {
  const [movie, setMovie] = React.useState(null);
  const [seats, setSeats] = React.useState([]);
  const [showtime, setShowtime] = React.useState(null);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    try {
      const movie = JSON.parse(localStorage.getItem("movie"));
      const seats = JSON.parse(localStorage.getItem("seats"));
      const showtime = JSON.parse(localStorage.getItem("showtime"));
      if (movie) {
        setMovie(movie);
      }
      if (seats) {
        setSeats(seats);
      }
      if (showtime) {
        setShowtime(showtime);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateMovie = (movie) => {
    setMovie(movie);
    localStorage.setItem("movie", JSON.stringify(movie));
  };

  const updateSeats = (seats) => {
    setSeats(seats);
    localStorage.setItem("seats", JSON.stringify(seats));
  };

  const updateShowtime = (showtime) => {
    setShowtime(showtime);
    localStorage.setItem("showtime", JSON.stringify(showtime));
  };

  const updateData = (data) => {
    setData(data);
    localStorage.setItem("data", JSON.stringify(data));
  };

  return (
    <BookingContext.Provider
      value={{
        movie: movie,
        seats: seats,
        showtime: showtime,
        data: data,
        updateMovie: updateMovie,
        updateShowtime: updateShowtime,
        updateSeats: updateSeats,
        updateData: updateData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
