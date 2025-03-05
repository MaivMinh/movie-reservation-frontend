import axios from "axios";


const authClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default authClient;