import axios from "axios";

const buyTicketClient = axios.create({
  baseURL: `http://moviereservation.software/api/buy-ticket`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default buyTicketClient;
