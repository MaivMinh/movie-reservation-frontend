import axios from "axios";


const authClient = axios.create({
  baseURL: `https://moviereservation.software/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default authClient;