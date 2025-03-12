import axios from "axios";

const movieClient = axios.create({
  baseURL: `https://moviereservation.software/api/movies`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default movieClient;
