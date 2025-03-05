import axios from "axios";

const bookingClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/bookings`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default bookingClient;
