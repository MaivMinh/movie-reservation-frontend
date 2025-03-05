import axios from "axios";

const movieClient = axios.create({
  baseURL: `http://165.22.244.209:80/movies`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default movieClient;
