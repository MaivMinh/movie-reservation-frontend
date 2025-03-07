import axios from "axios";

const bookingClient = axios.create({
  baseURL: `https://moviereservation.software/bookings`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default bookingClient;
