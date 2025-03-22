import axios from "axios";

const movieClient = axios.create({
  baseURL: `http://localhost:8888/api/movies`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default movieClient;
