import axios from "axios";

const profileClient = axios.create({
  baseURL: `https://moviereservation.software`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default profileClient;
