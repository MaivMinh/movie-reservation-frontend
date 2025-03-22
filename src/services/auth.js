import axios from "axios";


const authClient = axios.create({
  baseURL: `http://localhost:8888/api/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default authClient;