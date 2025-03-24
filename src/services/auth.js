import axios from "axios";


const authClient = axios.create({
  baseURL: `http://moviereservation.software/api/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default authClient;