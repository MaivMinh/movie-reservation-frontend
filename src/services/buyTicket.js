import axios from "axios";

const buyTicketClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/buy-ticket`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default buyTicketClient;
