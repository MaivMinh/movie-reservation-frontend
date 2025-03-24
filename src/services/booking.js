import axios from "axios";

const bookingClient = axios.create({
  baseURL: `http://moviereservation.software/api/bookings`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default bookingClient;
