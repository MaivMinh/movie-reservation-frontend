import axios from "axios";

const bookingClient = axios.create({
  baseURL: `http://localhost:8888/api/bookings`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default bookingClient;
