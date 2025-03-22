import axios from "axios";

const buyTicketClient = axios.create({
  baseURL: `http://localhost:8888/api/buy-ticket`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default buyTicketClient;
