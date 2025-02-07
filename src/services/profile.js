import axios from "axios";

const profileClient = axios.create({
  baseURL: "http://165.22.244.209:80",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default profileClient;
