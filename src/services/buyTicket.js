import axios from "axios";

const buyTicketClient = axios.create({
  baseURL: `https://moviereservation.software/buy-ticket`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default buyTicketClient;
