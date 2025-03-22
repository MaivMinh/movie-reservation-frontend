import axios from "axios";

const profileClient = axios.create({
  baseURL: `http://localhost:8888/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default profileClient;