import axios from "axios";

const bookingClient = axios.create({
  //baseURL: "http://165.22.244.209:80/bookings",
  baseURL: "http://localhost:8888/bookings",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default bookingClient;
