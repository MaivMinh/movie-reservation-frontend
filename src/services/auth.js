import axios from "axios";


const authClient = axios.create({
  baseURL: `https://moviereservation.software/api/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default authClient;