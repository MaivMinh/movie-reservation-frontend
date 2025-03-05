import axios from "axios";

const profileClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default profileClient;
