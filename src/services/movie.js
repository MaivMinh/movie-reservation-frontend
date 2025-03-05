import axios from "axios";

const movieClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/movies`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default movieClient;
