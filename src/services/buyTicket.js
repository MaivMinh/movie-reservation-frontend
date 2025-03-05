import axios from "axios";

const buyTicketClient = axios.create({
  baseURL: `http://165.22.244.209:80/buy-ticket`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default buyTicketClient;
