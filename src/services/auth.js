import axios from "axios";

const authClient = axios.create({
  baseURL: "http://165.22.244.209:80/auth",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default authClient;
